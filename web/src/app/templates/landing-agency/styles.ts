export const css = `
.hbl-ag-root {
  --hbl-ag-bg: #0e0e0e;
  --hbl-ag-surface: #161616;
  --hbl-ag-bone: #ece8df;
  --hbl-ag-muted: #a29d93;
  --hbl-ag-red: #ff4f2e;
  --hbl-ag-line: rgba(236, 232, 223, 0.14);
  position: relative;
  overflow-x: clip;
  background: var(--hbl-ag-bg);
  color: var(--hbl-ag-bone);
}
.hbl-ag-root ::selection { background: var(--hbl-ag-red); color: var(--hbl-ag-bg); }
.hbl-ag-root a:focus-visible,
.hbl-ag-root button:focus-visible,
.hbl-ag-root [tabindex]:focus-visible {
  outline: 2px solid var(--hbl-ag-red);
  outline-offset: 3px;
}
.hbl-ag-muted { color: var(--hbl-ag-muted); }
.hbl-ag-red { color: var(--hbl-ag-red); }
.hbl-ag-rule { border-color: var(--hbl-ag-line); }
.hbl-ag-wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding-left: 16px; padding-right: 16px; }
@media (min-width: 640px) { .hbl-ag-wrap { padding-left: 24px; padding-right: 24px; } }

.hbl-ag-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hbl-ag-muted);
}
.hbl-ag-kicker::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--hbl-ag-red);
}

.hbl-ag-link {
  position: relative;
  color: var(--hbl-ag-muted);
  transition: color .2s ease;
}
.hbl-ag-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .35s cubic-bezier(.22, .8, .24, 1);
}
.hbl-ag-link:hover, .hbl-ag-link:focus-visible { color: var(--hbl-ag-bone); }
.hbl-ag-link:hover::after, .hbl-ag-link:focus-visible::after { transform: scaleX(1); transform-origin: left; }

.hbl-ag-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  background: var(--hbl-ag-red);
  color: var(--hbl-ag-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 10px 30px -12px rgba(255, 79, 46, 0.7);
  transition: background .25s ease, color .25s ease, transform .25s ease;
}
.hbl-ag-pill:hover { background: var(--hbl-ag-bone); }
.hbl-ag-pill svg { transition: transform .3s cubic-bezier(.22, .8, .24, 1); }
.hbl-ag-pill:hover svg { transform: translateX(3px) rotate(-45deg); }
.hbl-ag-pill-ghost {
  background: transparent;
  color: var(--hbl-ag-bone);
  box-shadow: inset 0 0 0 1px var(--hbl-ag-line);
}
.hbl-ag-pill-ghost:hover { background: var(--hbl-ag-bone); color: var(--hbl-ag-bg); }

.hbl-ag-cols {
  position: absolute;
  inset: 0 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  pointer-events: none;
}
.hbl-ag-cols > span { border-left: 1px solid var(--hbl-ag-line); }
.hbl-ag-cols > span:last-child { border-right: 1px solid var(--hbl-ag-line); }
.hbl-ag-cols > span:nth-child(n+3) { display: none; }
@media (min-width: 640px) { .hbl-ag-cols { inset: 0 24px; } }
@media (min-width: 768px) {
  .hbl-ag-cols { grid-template-columns: repeat(4, 1fr); }
  .hbl-ag-cols > span:nth-child(n+3) { display: block; }
  .hbl-ag-cols > span:nth-child(2) { border-right: 0; }
}

.hbl-ag-hero-title {
  font-family: var(--font-grotesk);
  font-weight: 700;
  font-size: clamp(64px, 12vw, 200px);
  line-height: 0.86;
  letter-spacing: -0.055em;
  text-transform: uppercase;
}
.hbl-ag-serif {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  text-transform: none;
  letter-spacing: -0.02em;
}

@keyframes hbl-ag-drift {
  0% { transform: translate3d(-8%, -4%, 0) scale(1); }
  50% { transform: translate3d(6%, 4%, 0) scale(1.12); }
  100% { transform: translate3d(-8%, -4%, 0) scale(1); }
}
.hbl-ag-glow {
  position: absolute;
  width: 62vw;
  max-width: 900px;
  aspect-ratio: 1;
  right: -18vw;
  top: -22vw;
  border-radius: 999px;
  background: radial-gradient(closest-side, rgba(255, 79, 46, 0.22), rgba(255, 79, 46, 0.06) 55%, transparent 72%);
  filter: blur(10px);
  animation: hbl-ag-drift 18s ease-in-out infinite;
  pointer-events: none;
}

@keyframes hbl-ag-spin { to { transform: rotate(360deg); } }
.hbl-ag-badge { width: 132px; height: 132px; flex: 0 0 auto; position: relative; }
.hbl-ag-badge-ring { position: absolute; inset: 0; animation: hbl-ag-spin 22s linear infinite; }
.hbl-ag-badge-core {
  position: absolute;
  inset: 34px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--hbl-ag-red);
  color: var(--hbl-ag-bg);
  transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
}
.hbl-ag-badge:hover .hbl-ag-badge-core { transform: scale(1.12); }

@keyframes hbl-ag-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
.hbl-ag-live { width: 8px; height: 8px; border-radius: 999px; background: var(--hbl-ag-red); animation: hbl-ag-pulse 1.6s ease-in-out infinite; }

.hbl-ag-reel {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  aspect-ratio: 16 / 10;
  background:
    radial-gradient(60% 80% at 72% 40%, rgba(255, 79, 46, 0.95), rgba(255, 79, 46, 0) 60%),
    radial-gradient(50% 60% at 20% 90%, rgba(236, 232, 223, 0.16), transparent 70%),
    linear-gradient(160deg, #1b1b1b, #0e0e0e 70%);
  box-shadow: inset 0 0 0 1px var(--hbl-ag-line), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
@media (min-width: 768px) { .hbl-ag-reel { aspect-ratio: 21 / 9; } }
.hbl-ag-reel-play {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 999px;
  background: var(--hbl-ag-bone);
  color: var(--hbl-ag-bg);
  transition: transform .4s cubic-bezier(.34, 1.56, .64, 1), background .2s ease;
}
.hbl-ag-reel-play:hover { transform: scale(1.1); background: #fff; }
@keyframes hbl-ag-scrub { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hbl-ag-scrub { transform-origin: left; animation: hbl-ag-scrub 108s linear infinite; }

.hbl-ag-band {
  font-family: var(--font-grotesk);
  font-weight: 700;
  font-size: clamp(56px, 9vw, 140px);
  line-height: 1;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}
.hbl-ag-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--hbl-ag-bone);
}

.hbl-ag-numeral {
  font-family: var(--font-grotesk);
  font-weight: 500;
  line-height: 0.8;
  letter-spacing: -0.06em;
  font-variant-numeric: tabular-nums;
}

.hbl-ag-case { position: relative; min-width: 0; }
.hbl-ag-thumb {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  isolation: isolate;
  box-shadow: inset 0 0 0 1px var(--hbl-ag-line);
}
.hbl-ag-art {
  position: absolute;
  inset: 0;
  transition: transform .9s cubic-bezier(.22, .8, .24, 1);
}
.hbl-ag-art svg { display: block; width: 100%; height: 100%; }
.hbl-ag-case:hover .hbl-ag-art, .hbl-ag-case:focus-within .hbl-ag-art { transform: scale(1.045); }
.hbl-ag-detail {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 3;
  padding: 16px 18px;
  border-radius: 6px;
  background: var(--hbl-ag-bone);
  color: var(--hbl-ag-bg);
  transform: translateY(calc(100% + 16px));
  transition: transform .55s cubic-bezier(.22, .8, .24, 1);
}
.hbl-ag-case:hover .hbl-ag-detail, .hbl-ag-case:focus-within .hbl-ag-detail { transform: translateY(0); }
.hbl-ag-tag {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--hbl-ag-line);
  font-size: 12px;
  color: var(--hbl-ag-muted);
  white-space: nowrap;
}
.hbl-ag-case-title { transition: color .25s ease; }
.hbl-ag-case:hover .hbl-ag-case-title { color: var(--hbl-ag-red); }
.hbl-ag-arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 999px;
  border: 1px solid var(--hbl-ag-line);
  transition: background .25s ease, color .25s ease, transform .35s cubic-bezier(.22, .8, .24, 1), border-color .25s ease;
}
.hbl-ag-case:hover .hbl-ag-arrow, .hbl-ag-arrow:focus-visible {
  background: var(--hbl-ag-red);
  border-color: var(--hbl-ag-red);
  color: var(--hbl-ag-bg);
  transform: rotate(-45deg);
}
.hbl-ag-inview[data-on="false"] .hb-pr-grid > i { animation-play-state: paused; }

.hbl-ag-service { height: 100%; }
.hbl-ag-service-fill {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: var(--hbl-ag-red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .6s cubic-bezier(.22, .8, .24, 1);
}
.hbl-ag-service:hover .hbl-ag-service-fill { transform: scaleX(1); }
.hbl-ag-service:hover .hbl-ag-service-num { color: var(--hbl-ag-red); }
.hbl-ag-service-num { transition: color .3s ease; }

.hbl-ag-track {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: var(--hbl-ag-line);
}
.hbl-ag-track > span {
  position: absolute;
  inset: 0;
  background: var(--hbl-ag-red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 2.2s cubic-bezier(.65, 0, .2, 1) .2s;
}
.hbl-ag-inview[data-on="true"] .hbl-ag-track > span { transform: scaleX(1); }
.hbl-ag-step-dot {
  position: absolute;
  top: -5px;
  left: 0;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--hbl-ag-bg);
  box-shadow: inset 0 0 0 1px var(--hbl-ag-muted);
  transition: background .3s ease, box-shadow .3s ease;
}
.hbl-ag-inview[data-on="true"] .hbl-ag-step-dot {
  background: var(--hbl-ag-red);
  box-shadow: 0 0 0 4px rgba(255, 79, 46, 0.18);
  transition-delay: var(--hbl-ag-d, 0s);
}

.hbl-ag-award { transition: background .25s ease, padding .35s cubic-bezier(.22, .8, .24, 1); }
.hbl-ag-award:hover { background: rgba(236, 232, 223, 0.04); padding-left: 12px; }
.hbl-ag-award:hover .hbl-ag-award-name { color: var(--hbl-ag-red); }
.hbl-ag-award-name { transition: color .25s ease; }

.hbl-ag-faq .hb-ac-trigger { padding-top: 22px; padding-bottom: 22px; font-family: var(--font-grotesk); font-size: 19px; font-weight: 500; letter-spacing: -0.015em; transition: color .2s ease; }
.hbl-ag-faq .hb-ac-trigger:hover, .hbl-ag-faq .hb-ac-item[data-open="true"] .hb-ac-trigger { color: var(--hbl-ag-red); }
.hbl-ag-faq .hb-ac-body { color: var(--hbl-ag-muted); font-size: 15px; line-height: 1.65; max-width: 60ch; }

.hbl-ag-cta-title {
  font-family: var(--font-grotesk);
  font-weight: 700;
  font-size: clamp(56px, 10vw, 168px);
  line-height: 0.86;
  letter-spacing: -0.055em;
  text-transform: uppercase;
}
.hbl-ag-mail {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-height: 72px;
  padding: 0 30px;
  border-radius: 999px;
  background: var(--hbl-ag-red);
  color: var(--hbl-ag-bg);
  font-family: var(--font-grotesk);
  font-weight: 600;
  font-size: clamp(16px, 2.2vw, 22px);
  letter-spacing: -0.02em;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 20px 60px -20px rgba(255, 79, 46, 0.8);
  transition: background .25s ease;
}
.hbl-ag-mail:hover { background: var(--hbl-ag-bone); }

.hbl-ag-foot-mark {
  font-family: var(--font-grotesk);
  font-weight: 700;
  font-size: clamp(52px, 12.5vw, 180px);
  line-height: 0.8;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px rgba(236, 232, 223, 0.32);
  white-space: nowrap;
  transition: color .6s ease;
}
.hbl-ag-foot-mark:hover { color: rgba(236, 232, 223, 0.06); }

@media (prefers-reduced-motion: reduce) {
  .hbl-ag-glow, .hbl-ag-badge-ring, .hbl-ag-live, .hbl-ag-scrub { animation: none; }
  .hbl-ag-root *, .hbl-ag-root *::before, .hbl-ag-root *::after { transition-duration: 0.01ms !important; transition-delay: 0s !important; }
}
`;
