export const css = `
.hbl-fn-root {
  --hbl-fn-bg: #060b1a;
  --hbl-fn-surface: #0a1226;
  --hbl-fn-raised: #0e1830;
  --hbl-fn-line: rgba(148, 163, 184, 0.16);
  --hbl-fn-line-strong: rgba(148, 163, 184, 0.26);
  --hbl-fn-text: #eaf2ff;
  --hbl-fn-muted: #94a3b8;
  --hbl-fn-em: #34d399;
  --hbl-fn-blue: #3b82f6;
  position: relative;
  overflow-x: clip;
  background: var(--hbl-fn-bg);
  color: var(--hbl-fn-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
.hbl-fn-root ::selection { background: rgba(52, 211, 153, 0.32); color: #ffffff; }
.hbl-fn-wrap { width: 100%; max-width: 1232px; margin: 0 auto; padding: 0 20px; }
@media (min-width: 768px) { .hbl-fn-wrap { padding: 0 32px; } }
.hbl-fn-section { position: relative; padding: 88px 0; }
@media (min-width: 768px) { .hbl-fn-section { padding: 128px 0; } }
.hbl-fn-hair { border-top: 1px solid var(--hbl-fn-line); }

.hbl-fn-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 10px;
  border: 1px solid var(--hbl-fn-line);
  border-radius: 999px;
  background: rgba(10, 18, 38, 0.6);
  color: #b6c4d8;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.hbl-fn-eyebrow-link { transition: border-color .2s ease, color .2s ease, background-color .2s ease; }
.hbl-fn-eyebrow-link:hover { border-color: rgba(52, 211, 153, 0.45); color: #ffffff; background: rgba(10, 18, 38, 0.8); }
.hbl-fn-eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--hbl-fn-em);
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18), 0 0 12px rgba(52, 211, 153, 0.8);
}
.hbl-fn-h1 {
  font-size: clamp(44px, 8vw, 88px);
  line-height: 0.98;
  letter-spacing: -0.045em;
  font-weight: 600;
  text-wrap: balance;
}
.hbl-fn-h2 {
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 600;
  text-wrap: balance;
}
.hbl-fn-h3 { font-size: 19px; line-height: 1.3; letter-spacing: -0.02em; font-weight: 600; }
.hbl-fn-lead { color: var(--hbl-fn-muted); font-size: clamp(16px, 1.6vw, 19px); line-height: 1.6; text-wrap: pretty; }
.hbl-fn-body { color: var(--hbl-fn-muted); font-size: 15px; line-height: 1.6; }
.hbl-fn-serif {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.015em;
  padding-right: 0.06em;
  background: linear-gradient(100deg, #a7f3d0 0%, #34d399 40%, #60a5fa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hbl-fn-h1 .hb-gradient { font-family: var(--font-serif); font-style: italic; font-weight: 400; letter-spacing: -0.02em; padding: 0 0.08em 0.06em 0; }
.hbl-fn-mono { font-family: var(--font-mono); }
.hbl-fn-num { font-variant-numeric: tabular-nums; }

.hbl-fn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 22px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  transition: background-color .2s ease, box-shadow .25s ease, color .2s ease, transform .2s ease, border-color .2s ease;
}
.hbl-fn-btn svg { width: 16px; height: 16px; transition: transform .25s ease; }
.hbl-fn-btn:hover svg { transform: translateX(3px); }
.hbl-fn-btn:focus-visible, .hbl-fn-link:focus-visible, .hbl-fn-focus:focus-visible {
  outline: 2px solid var(--hbl-fn-em);
  outline-offset: 3px;
}
.hbl-fn-btn-primary {
  background: var(--hbl-fn-text);
  color: #04101f;
  box-shadow: inset 0 -2px 0 rgba(6, 11, 26, 0.12), 0 8px 30px -10px rgba(52, 211, 153, 0.55);
}
.hbl-fn-btn-primary:hover { background: #ffffff; box-shadow: inset 0 -2px 0 rgba(6, 11, 26, 0.12), 0 10px 40px -8px rgba(52, 211, 153, 0.85); }
.hbl-fn-btn-ghost {
  border: 1px solid var(--hbl-fn-line-strong);
  background: rgba(10, 18, 38, 0.55);
  color: var(--hbl-fn-text);
  backdrop-filter: blur(8px);
}
.hbl-fn-btn-ghost:hover { border-color: rgba(148, 163, 184, 0.45); background: rgba(30, 41, 70, 0.6); }
.hbl-fn-btn-sm { height: 36px; padding: 0 16px; font-size: 14px; }
.hbl-fn-link { color: #b6c4d8; transition: color .2s ease; border-radius: 6px; }
.hbl-fn-link:hover { color: #ffffff; }

.hbl-fn-card {
  position: relative;
  border: 1px solid var(--hbl-fn-line);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.06), rgba(148, 163, 184, 0.015) 60%), var(--hbl-fn-surface);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 30px 60px -40px rgba(0, 0, 0, 0.8);
}
.hbl-fn-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: 1px solid var(--hbl-fn-line);
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.06);
  color: #c8d4e6;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}
.hbl-fn-chip-em { border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.1); color: #6ee7b7; }
.hbl-fn-chip-blue { border-color: rgba(59, 130, 246, 0.35); background: rgba(59, 130, 246, 0.12); color: #93c5fd; }

.hbl-fn-nav-link { position: relative; padding: 6px 2px; color: #b6c4d8; font-size: 14px; transition: color .2s ease; border-radius: 6px; }
.hbl-fn-nav-link::after {
  content: "";
  position: absolute;
  left: 2px;
  right: 2px;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--hbl-fn-em), var(--hbl-fn-blue));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .3s cubic-bezier(.2, .9, .2, 1);
}
.hbl-fn-nav-link:hover { color: #ffffff; }
.hbl-fn-nav-link:hover::after { transform: scaleX(1); }
.hbl-fn-nav-link:focus-visible { outline: 2px solid var(--hbl-fn-em); outline-offset: 4px; }

.hbl-fn-hero-fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(60% 50% at 50% 0%, rgba(6, 11, 26, 0) 0%, rgba(6, 11, 26, 0.55) 100%),
    linear-gradient(180deg, rgba(6, 11, 26, 0.2) 0%, rgba(6, 11, 26, 0.5) 45%, var(--hbl-fn-bg) 92%);
}
.hbl-fn-hero-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: center top;
  -webkit-mask-image: radial-gradient(70% 55% at 50% 22%, #000 0%, transparent 75%);
  mask-image: radial-gradient(70% 55% at 50% 22%, #000 0%, transparent 75%);
}
.hbl-fn-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 999px;
  filter: blur(80px);
  opacity: 0.5;
}

.hbl-fn-console {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--hbl-fn-line-strong);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(14, 24, 48, 0.92), rgba(8, 14, 30, 0.96));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 0 6px rgba(148, 163, 184, 0.04),
    0 50px 120px -40px rgba(0, 0, 0, 0.9),
    0 0 120px -30px rgba(52, 211, 153, 0.35);
  backdrop-filter: blur(14px);
}
.hbl-fn-console-bar { display: flex; align-items: center; gap: 12px; height: 44px; padding: 0 16px; border-bottom: 1px solid var(--hbl-fn-line); background: rgba(6, 11, 26, 0.5); }
.hbl-fn-dots { display: flex; gap: 6px; }
.hbl-fn-dots span { width: 10px; height: 10px; border-radius: 999px; background: rgba(148, 163, 184, 0.22); }
.hbl-fn-addr {
  flex: 1;
  min-width: 0;
  max-width: 340px;
  margin: 0 auto;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid var(--hbl-fn-line);
  border-radius: 8px;
  background: rgba(148, 163, 184, 0.05);
  color: #8193ab;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
}
.hbl-fn-side-item { display: flex; align-items: center; gap: 10px; height: 34px; padding: 0 10px; border-radius: 9px; color: #8b9bb3; font-size: 13px; }
.hbl-fn-side-item svg { width: 16px; height: 16px; flex: none; }
.hbl-fn-side-item[data-active="true"] { background: rgba(52, 211, 153, 0.1); color: #eaf2ff; box-shadow: inset 0 0 0 1px rgba(52, 211, 153, 0.2); }
.hbl-fn-side-item[data-active="true"] svg { color: var(--hbl-fn-em); }
.hbl-fn-live { display: inline-flex; align-items: center; gap: 6px; color: #6ee7b7; font-size: 12px; font-weight: 500; }
.hbl-fn-live i { position: relative; width: 7px; height: 7px; border-radius: 999px; background: var(--hbl-fn-em); }
.hbl-fn-live i::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--hbl-fn-em);
  animation: hbl-fn-ping 1.8s cubic-bezier(0, 0, .2, 1) infinite;
}
@keyframes hbl-fn-ping { 0% { transform: scale(1); opacity: .8; } 80%, 100% { transform: scale(3); opacity: 0; } }

.hbl-fn-float { animation: hbl-fn-bob 7s ease-in-out infinite; }
.hbl-fn-float-b { animation: hbl-fn-bob 8.5s ease-in-out -3s infinite; }
.hbl-fn-float-c { animation: hbl-fn-bob 6.5s ease-in-out -1.5s infinite; }
@keyframes hbl-fn-bob { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -12px, 0); } }

.hbl-fn-paycard {
  position: relative;
  width: 300px;
  max-width: 100%;
  aspect-ratio: 1.586 / 1;
  overflow: hidden;
  border-radius: 18px;
  padding: 20px 22px;
  color: #eaf2ff;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(52, 211, 153, 0.55) 0%, rgba(52, 211, 153, 0) 55%),
    radial-gradient(90% 90% at 0% 100%, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 60%),
    linear-gradient(135deg, #0d1f3d 0%, #071226 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 30px 60px -20px rgba(0, 0, 0, 0.85), 0 0 50px -10px rgba(52, 211, 153, 0.35);
}
.hbl-fn-paycard::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-radial-gradient(circle at 120% 120%, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 14px);
}
.hbl-fn-paychip {
  width: 38px;
  height: 28px;
  border-radius: 7px;
  background: linear-gradient(135deg, #f5e6b8, #c9a961 55%, #f0dca0);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
}

.hbl-fn-marquee-item { display: inline-flex; align-items: center; gap: 10px; color: #7d8ea8; font-size: 19px; font-weight: 600; letter-spacing: -0.02em; white-space: nowrap; transition: color .25s ease; }
.hbl-fn-marquee-item:hover { color: #eaf2ff; }
.hbl-fn-marquee-item svg { width: 24px; height: 24px; }

.hbl-fn-stat { position: relative; padding: 28px 24px; background: linear-gradient(180deg, rgba(148, 163, 184, 0.05), rgba(148, 163, 184, 0.01)), var(--hbl-fn-surface); }
.hbl-fn-stat-value {
  font-size: clamp(36px, 3.8vw, 52px);
  line-height: 1;
  letter-spacing: -0.045em;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #f1f6ff;
  text-shadow: 0 0 32px rgba(52, 211, 153, 0.25);
}

.hbl-fn-method { display: flex; align-items: center; justify-content: space-between; gap: 10px; height: 40px; padding: 0 12px; border: 1px solid var(--hbl-fn-line); border-radius: 12px; background: rgba(6, 11, 26, 0.5); font-size: 13px; color: #c8d4e6; transition: border-color .2s ease, background-color .2s ease; }
.hbl-fn-method:hover { border-color: rgba(52, 211, 153, 0.35); background: rgba(52, 211, 153, 0.06); }
.hbl-fn-flag { display: grid; place-items: center; width: 26px; height: 26px; flex: none; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: 0.02em; color: #04101f; }

.hbl-fn-map { width: 100%; height: auto; display: block; overflow: visible; }
.hbl-fn-map-dots { stroke: rgba(148, 163, 184, 0.32); stroke-linecap: round; fill: none; }
.hbl-fn-route { fill: none; stroke: rgba(52, 211, 153, 0.22); stroke-width: 1.2; }
.hbl-fn-packet {
  fill: none;
  stroke: url(#hbl-fn-route-grad);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-dasharray: 0.16 1;
  stroke-dashoffset: 1.16;
  filter: drop-shadow(0 0 4px rgba(52, 211, 153, 0.9));
  animation: hbl-fn-travel var(--hbl-fn-d, 3.2s) cubic-bezier(.45, 0, .25, 1) var(--hbl-fn-delay, 0s) infinite;
}
@keyframes hbl-fn-travel { 0% { stroke-dashoffset: 1.16; opacity: 0; } 8% { opacity: 1; } 85% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
.hbl-fn-city { fill: #eaf2ff; }
.hbl-fn-city-ring {
  fill: none;
  stroke: var(--hbl-fn-em);
  stroke-width: 1.4;
  transform-box: fill-box;
  transform-origin: center;
  animation: hbl-fn-pulse 2.6s ease-out var(--hbl-fn-delay, 0s) infinite;
}
@keyframes hbl-fn-pulse { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(3.2); opacity: 0; } }
.hbl-fn-city-label { fill: #b6c4d8; font-size: 15px; font-family: var(--font-sans); font-weight: 500; letter-spacing: 0.01em; }

.hbl-fn-corridor { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--hbl-fn-line); font-size: 14px; }
.hbl-fn-corridor:last-child { border-bottom: 0; }
.hbl-fn-bar { position: relative; width: 72px; height: 4px; border-radius: 999px; background: rgba(148, 163, 184, 0.14); overflow: hidden; }
.hbl-fn-bar span { position: absolute; inset: 0 auto 0 0; border-radius: inherit; background: linear-gradient(90deg, var(--hbl-fn-em), var(--hbl-fn-blue)); }

.hbl-fn-table { width: 100%; border-collapse: collapse; font-size: 14px; color: #c8d4e6; }
.hbl-fn-table thead { color: #8193ab; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
.hbl-fn-table thead th { padding: 12px 14px; text-align: left; font-weight: 500; border-bottom: 1px solid var(--hbl-fn-line); white-space: nowrap; }
.hbl-fn-table tbody th { padding: 14px; text-align: left; font-weight: 400; color: #eaf2ff; border-bottom: 1px solid var(--hbl-fn-line); }
.hbl-fn-table td { padding: 14px; border-bottom: 1px solid var(--hbl-fn-line); white-space: nowrap; }
.hbl-fn-table tr > :first-child { padding-left: 20px; }
@media (min-width: 768px) { .hbl-fn-table tr > :first-child { padding-left: 24px; } }
.hbl-fn-table tbody tr { transition: background-color .2s ease; }
.hbl-fn-table tbody tr:hover { background: rgba(148, 163, 184, 0.05); }
.hbl-fn-table tbody tr:last-child > * { border-bottom: 0; }
.hbl-fn-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }

.hbl-fn-code { font-family: var(--font-mono); font-size: 13px; line-height: 1.75; color: #c8d4e6; white-space: pre; tab-size: 2; }
.hbl-fn-code .k { color: #93c5fd; }
.hbl-fn-code .s { color: #6ee7b7; }
.hbl-fn-code .n { color: #fcd34d; }
.hbl-fn-code .f { color: #c4b5fd; }
.hbl-fn-code .p { color: #64748b; }
.hbl-fn-code-tab { height: 32px; padding: 0 12px; border-radius: 8px; font-size: 12.5px; color: #8193ab; display: inline-flex; align-items: center; }
.hbl-fn-code-tab[data-active="true"] { background: rgba(148, 163, 184, 0.1); color: #eaf2ff; }
.hbl-fn-caret { display: inline-block; width: 7px; height: 15px; margin-left: 2px; vertical-align: -2px; background: var(--hbl-fn-em); animation: hbl-fn-blink 1.1s steps(2) infinite; }
@keyframes hbl-fn-blink { 50% { opacity: 0; } }

.hbl-fn-quote-mark { font-family: var(--font-serif); font-size: 96px; line-height: 0.6; color: rgba(52, 211, 153, 0.5); }
.hbl-fn-avatar { display: grid; place-items: center; width: 40px; height: 40px; flex: none; border-radius: 999px; font-size: 13px; font-weight: 600; color: #04101f; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25); }

.hbl-fn-plan { height: 100%; padding: 28px; border-radius: 22px; }
.hbl-fn-plan-featured {
  background:
    radial-gradient(80% 60% at 50% 0%, rgba(52, 211, 153, 0.16), rgba(52, 211, 153, 0) 70%),
    linear-gradient(180deg, rgba(148, 163, 184, 0.07), rgba(148, 163, 184, 0.02)),
    var(--hbl-fn-raised);
  box-shadow: inset 0 0 0 1px rgba(52, 211, 153, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 40px 80px -40px rgba(52, 211, 153, 0.45);
}
.hbl-fn-check { width: 16px; height: 16px; flex: none; margin-top: 3px; color: var(--hbl-fn-em); }

.hbl-fn-cta {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border: 1px solid var(--hbl-fn-line-strong);
  border-radius: 32px;
  background: #050a18;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 60px 120px -60px rgba(52, 211, 153, 0.6);
}
.hbl-fn-cta-veil { position: absolute; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(70% 70% at 50% 50%, rgba(5, 10, 24, 0.2), rgba(5, 10, 24, 0.85)); }

.hbl-fn-root .hb-stc { border-color: var(--hbl-fn-line); background: rgba(6, 11, 26, 0.55); }
.hbl-fn-root .hb-area-grid, .hbl-fn-root .hb-area-base { stroke: rgba(148, 163, 184, 0.14); }
.hbl-fn-root .hb-tu-list { border-bottom-color: var(--hbl-fn-line); }
.hbl-fn-root .hb-tu-tab { font-size: 14px; }
.hbl-fn-root .hb-spc { background: var(--hbl-fn-surface); box-shadow: inset 0 0 0 1px var(--hbl-fn-line); }
.hbl-fn-root .hb-orb-tile { background: linear-gradient(160deg, #13203d, #0a1226); color: #d6e2f3; }
.hbl-fn-root .hb-abm-node { background: linear-gradient(160deg, #13203d, #0a1226); }
.hbl-fn-root .hb-ac-item { border-color: var(--hbl-fn-line); }
.hbl-fn-root .hb-ac-trigger { font-size: 16px; font-weight: 500; padding: 20px 4px; letter-spacing: -0.01em; }
.hbl-fn-root .hb-ac-trigger:focus-visible { outline: 2px solid var(--hbl-fn-em); outline-offset: 2px; border-radius: 8px; }
.hbl-fn-root .hb-ac-body { color: var(--hbl-fn-muted); font-size: 15px; line-height: 1.65; }
.hbl-fn-root .hb-ftc-in { background: transparent; border-top-color: var(--hbl-fn-line); padding-left: 0; padding-right: 0; }

@media (prefers-reduced-motion: reduce) {
  .hbl-fn-float, .hbl-fn-float-b, .hbl-fn-float-c, .hbl-fn-caret, .hbl-fn-live i::after, .hbl-fn-city-ring { animation: none; }
  .hbl-fn-packet { animation: none; stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0.55; filter: none; }
  .hbl-fn-btn, .hbl-fn-btn svg, .hbl-fn-nav-link::after, .hbl-fn-marquee-item, .hbl-fn-method { transition: none; }
}
`;
