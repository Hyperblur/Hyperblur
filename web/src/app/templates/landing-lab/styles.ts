export const css = `
.hbl-lb {
  --hbl-lb-bg: #05070b;
  --hbl-lb-panel: rgba(255, 255, 255, .025);
  --hbl-lb-line: rgba(255, 255, 255, .12);
  --hbl-lb-line-soft: rgba(255, 255, 255, .07);
  --hbl-lb-ink: #d9dee8;
  --hbl-lb-mute: #7a8394;
  --hbl-lb-red: #ff4d4d;
  --hbl-lb-cyan: #5eead4;
  --hbl-lb-r: 430px;
  --hbl-lb-cw: 220px;
  --hbl-lb-ch: 286px;
  position: relative;
  overflow-x: clip;
  background: var(--hbl-lb-bg);
  color: var(--hbl-lb-ink);
  font-family: var(--font-sans);
}
.hbl-lb *, .hbl-lb *::before, .hbl-lb *::after { box-sizing: border-box; }
.hbl-lb ::selection { background: var(--hbl-lb-red); color: #05070b; }
.hbl-lb a:focus-visible, .hbl-lb button:focus-visible, .hbl-lb input:focus-visible, .hbl-lb textarea:focus-visible, .hbl-lb [tabindex]:focus-visible {
  outline: 1px solid var(--hbl-lb-red);
  outline-offset: 3px;
}
.hbl-lb-wrap { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 640px) { .hbl-lb-wrap { padding: 0 24px; } }
.hbl-lb-grid {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, .045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, .045) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: center top;
}
.hbl-lb-dots {
  background-image: radial-gradient(rgba(217, 222, 232, .11) 1px, transparent 1.3px);
  background-size: 14px 14px;
}
.hbl-lb-mask {
  -webkit-mask-image: radial-gradient(ellipse 70% 65% at 50% 40%, #000 25%, transparent 100%);
  mask-image: radial-gradient(ellipse 70% 65% at 50% 40%, #000 25%, transparent 100%);
}
.hbl-lb-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  line-height: 1.4;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--hbl-lb-mute);
}
.hbl-lb-label-red { color: var(--hbl-lb-red); }
.hbl-lb-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--hbl-lb-red);
}
.hbl-lb-kicker::before {
  content: "";
  width: 18px;
  height: 1px;
  background: var(--hbl-lb-red);
  box-shadow: 0 0 8px var(--hbl-lb-red);
}
.hbl-lb-h1 {
  font-family: var(--font-grotesk);
  font-weight: 500;
  font-size: clamp(38px, 7vw, 76px);
  line-height: .98;
  letter-spacing: -.035em;
  color: #eef1f6;
}
.hbl-lb-h2 {
  font-family: var(--font-grotesk);
  font-weight: 500;
  font-size: clamp(30px, 4.4vw, 48px);
  line-height: 1.04;
  letter-spacing: -.03em;
  color: #eef1f6;
}
.hbl-lb-copy { color: var(--hbl-lb-mute); line-height: 1.65; }
.hbl-lb-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hbl-lb-cyan);
  box-shadow: 0 0 10px var(--hbl-lb-cyan);
  animation: hbl-lb-blink 2.4s steps(2, end) infinite;
}
.hbl-lb-dot-red { background: var(--hbl-lb-red); box-shadow: 0 0 10px var(--hbl-lb-red); }
@keyframes hbl-lb-blink { 0%, 70% { opacity: 1; } 85% { opacity: .25; } 100% { opacity: 1; } }

.hbl-lb-panel {
  position: relative;
  background: var(--hbl-lb-panel);
  border: 1px solid var(--hbl-lb-line-soft);
}
.hbl-lb-panel::before {
  content: "";
  position: absolute;
  inset: -1px;
  pointer-events: none;
  --c: rgba(217, 222, 232, .55);
  background:
    linear-gradient(var(--c), var(--c)) top left / 9px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) top left / 1px 9px no-repeat,
    linear-gradient(var(--c), var(--c)) top right / 9px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) top right / 1px 9px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / 9px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / 1px 9px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 9px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 1px 9px no-repeat;
}
.hbl-lb-panel-red::before { --c: var(--hbl-lb-red); }

.hbl-lb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 42px;
  padding: 0 18px;
  border: 1px solid var(--hbl-lb-line);
  background: rgba(255, 255, 255, .02);
  color: var(--hbl-lb-ink);
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: .16em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color .2s, color .2s, background-color .2s, box-shadow .2s;
}
.hbl-lb-btn::before { content: "["; color: var(--hbl-lb-mute); transition: transform .2s, color .2s; }
.hbl-lb-btn::after { content: "]"; color: var(--hbl-lb-mute); transition: transform .2s, color .2s; }
.hbl-lb-btn:hover { border-color: rgba(255, 255, 255, .28); color: #fff; }
.hbl-lb-btn:hover::before { transform: translateX(-3px); color: var(--hbl-lb-red); }
.hbl-lb-btn:hover::after { transform: translateX(3px); color: var(--hbl-lb-red); }
.hbl-lb-btn-red {
  border-color: rgba(255, 77, 77, .6);
  background: rgba(255, 77, 77, .1);
  color: #fff;
  box-shadow: 0 0 0 1px rgba(255, 77, 77, .08), 0 0 28px -6px rgba(255, 77, 77, .55);
}
.hbl-lb-btn-red::before, .hbl-lb-btn-red::after { color: var(--hbl-lb-red); }
.hbl-lb-btn-red:hover { background: rgba(255, 77, 77, .18); border-color: var(--hbl-lb-red); }
.hbl-lb-btn-sm { height: 34px; padding: 0 12px; font-size: 10.5px; }

.hbl-lb-chip {
  position: relative;
  height: 32px;
  padding: 0 14px;
  border: 1px solid var(--hbl-lb-line-soft);
  background: transparent;
  color: var(--hbl-lb-mute);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: .16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color .2s, border-color .2s, background-color .2s;
}
.hbl-lb-chip::before {
  content: "";
  position: absolute;
  inset: -1px;
  pointer-events: none;
  --c: transparent;
  background:
    linear-gradient(var(--c), var(--c)) top left / 6px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) top left / 1px 6px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 6px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 1px 6px no-repeat;
}
.hbl-lb-chip:hover { color: var(--hbl-lb-ink); border-color: var(--hbl-lb-line); }
.hbl-lb-chip[aria-pressed="true"], .hbl-lb-chip[aria-checked="true"] {
  color: #fff;
  border-color: rgba(255, 77, 77, .45);
  background: rgba(255, 77, 77, .08);
}
.hbl-lb-chip[aria-pressed="true"]::before, .hbl-lb-chip[aria-checked="true"]::before { --c: var(--hbl-lb-red); }
.hbl-lb-chip-n { margin-left: 8px; color: var(--hbl-lb-mute); }

.hbl-lb-nav {
  position: relative;
  z-index: 30;
  border-bottom: 1px solid var(--hbl-lb-line-soft);
  background: rgba(5, 7, 11, .78);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
.hbl-lb-navlink {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--hbl-lb-mute);
  transition: color .2s;
}
.hbl-lb-navlink:hover { color: #fff; }

.hbl-lb-boot {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #05070b;
  color: var(--hbl-lb-ink);
  animation: hbl-lb-bootfail .01s linear 9s forwards;
}
.hbl-lb-boot[data-phase="out"] {
  animation: hbl-lb-bootout .7s cubic-bezier(.7, 0, .2, 1) forwards;
}
@keyframes hbl-lb-bootout {
  0% { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(0 0 100% 0); }
}
@keyframes hbl-lb-bootfail { to { visibility: hidden; opacity: 0; pointer-events: none; } }
.hbl-lb-boot-edge {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--hbl-lb-red);
  box-shadow: 0 0 24px 2px var(--hbl-lb-red);
  opacity: 0;
}
.hbl-lb-boot[data-phase="out"] .hbl-lb-boot-edge { opacity: 1; height: 2px; animation: hbl-lb-edgeup .7s cubic-bezier(.7, 0, .2, 1) forwards; }
@keyframes hbl-lb-edgeup { from { bottom: 0; } to { bottom: 100%; } }
.hbl-lb-boot-card { width: 100%; max-width: 460px; }
.hbl-lb-bar {
  position: relative;
  height: 6px;
  border: 1px solid var(--hbl-lb-line);
  padding: 1px;
}
.hbl-lb-bar-fill {
  height: 100%;
  background: repeating-linear-gradient(90deg, var(--hbl-lb-red) 0 6px, transparent 6px 8px);
  box-shadow: 0 0 14px rgba(255, 77, 77, .6);
  transform-origin: left center;
}
.hbl-lb-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--hbl-lb-mute);
}
.hbl-lb-row-fill { flex: 1; min-width: 12px; border-bottom: 1px dotted rgba(255, 255, 255, .16); transform: translateY(-3px); }
.hbl-lb-row[data-state="ok"] .hbl-lb-row-s { color: var(--hbl-lb-cyan); }
.hbl-lb-row[data-state="run"] .hbl-lb-row-s { color: var(--hbl-lb-red); }
.hbl-lb-row[data-state="ok"] .hbl-lb-row-k { color: var(--hbl-lb-ink); }
.hbl-lb-cursor { display: inline-block; width: 7px; height: 12px; background: var(--hbl-lb-red); vertical-align: -1px; animation: hbl-lb-blink 1s steps(2, end) infinite; }

.hbl-lb-stage {
  position: relative;
  height: 440px;
  perspective: 1500px;
  perspective-origin: 50% 30%;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
}
.hbl-lb-stage[data-drag="true"] { cursor: grabbing; }
.hbl-lb-stage:focus-visible { outline: 1px solid var(--hbl-lb-red); outline-offset: 6px; }
.hbl-lb-ring {
  position: absolute;
  left: 50%;
  top: 44%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  transform: translateZ(calc(var(--hbl-lb-r) * -1));
}
.hbl-lb-orbit {
  position: absolute;
  left: 0;
  top: calc(var(--hbl-lb-ch) / 2 + 14px);
  width: calc(var(--hbl-lb-r) * 2 + 80px);
  height: calc(var(--hbl-lb-r) * 2 + 80px);
  transform: translate(-50%, -50%) rotateX(90deg);
  pointer-events: none;
}
.hbl-lb-card {
  position: absolute;
  left: calc(var(--hbl-lb-cw) / -2);
  top: calc(var(--hbl-lb-ch) / -2);
  width: var(--hbl-lb-cw);
  height: var(--hbl-lb-ch);
  padding: 0;
  border: 1px solid var(--hbl-lb-line);
  background: #090c12;
  color: var(--hbl-lb-ink);
  text-align: left;
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform, opacity, filter;
  transition: border-color .3s, box-shadow .3s;
}
.hbl-lb-card[data-front="true"] {
  border-color: rgba(255, 77, 77, .55);
  box-shadow: 0 0 0 1px rgba(255, 77, 77, .12), 0 24px 60px -20px rgba(255, 77, 77, .45);
}
.hbl-lb-card-art { position: absolute; inset: 8px 8px 64px; overflow: hidden; border: 1px solid var(--hbl-lb-line-soft); background: #070a0f; }
.hbl-lb-card-art svg { display: block; width: 100%; height: 100%; }
.hbl-lb-card-foot { position: absolute; left: 12px; right: 12px; bottom: 12px; }
.hbl-lb-card-title { font-family: var(--font-grotesk); font-size: 17px; font-weight: 500; letter-spacing: -.01em; color: #eef1f6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hbl-lb-card::after {
  content: "";
  position: absolute;
  inset: -1px;
  pointer-events: none;
  --c: rgba(217, 222, 232, .5);
  background:
    linear-gradient(var(--c), var(--c)) top left / 8px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) top left / 1px 8px no-repeat,
    linear-gradient(var(--c), var(--c)) top right / 8px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) top right / 1px 8px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / 8px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / 1px 8px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 8px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 1px 8px no-repeat;
}
.hbl-lb-card[data-front="true"]::after { --c: var(--hbl-lb-red); }
.hbl-lb-arrow {
  position: absolute;
  top: 44%;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-top: -21px;
  border: 1px solid var(--hbl-lb-line);
  background: rgba(5, 7, 11, .7);
  color: var(--hbl-lb-ink);
  cursor: pointer;
  transition: border-color .2s, color .2s;
}
.hbl-lb-arrow:hover { border-color: var(--hbl-lb-red); color: #fff; }
.hbl-lb-arrow-l { left: 0; }
.hbl-lb-arrow-r { right: 0; }
.hbl-lb-empty { position: absolute; inset: 0; display: grid; place-items: center; }
@media (max-width: 639px) {
  .hbl-lb { --hbl-lb-r: 230px; --hbl-lb-cw: 156px; --hbl-lb-ch: 210px; }
  .hbl-lb-stage { height: 330px; }
  .hbl-lb-card-art { bottom: 56px; }
  .hbl-lb-card-title { font-size: 15px; }
}

.hbl-lb-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--hbl-lb-line-soft); border-left: 1px solid var(--hbl-lb-line-soft); }
@media (min-width: 640px) { .hbl-lb-meta { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.hbl-lb-meta > div { min-width: 0; padding: 10px 12px; border-right: 1px solid var(--hbl-lb-line-soft); border-bottom: 1px solid var(--hbl-lb-line-soft); }
.hbl-lb-meta dd { margin: 4px 0 0; font-family: var(--font-mono); font-size: 13px; color: var(--hbl-lb-ink); }

.hbl-lb-status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  padding: 9px 14px;
  border: 1px solid var(--hbl-lb-line-soft);
  background: rgba(255, 255, 255, .015);
}
.hbl-lb-key {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 18px;
  padding: 0 5px;
  margin-right: 6px;
  border: 1px solid var(--hbl-lb-line);
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--hbl-lb-ink);
}

.hbl-lb-scan { position: relative; overflow: hidden; }
.hbl-lb-scan::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 70px;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(255, 77, 77, .05) 85%, rgba(255, 77, 77, .28) 99%, transparent);
  animation: hbl-lb-scanmove 5.5s linear infinite;
}
@keyframes hbl-lb-scanmove { 0% { top: -80px; } 100% { top: 100%; } }

.hbl-lb-canvas { display: block; width: 100%; height: 100%; }
.hbl-lb-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 22px;
  background: transparent;
  cursor: pointer;
}
.hbl-lb-range::-webkit-slider-runnable-track { height: 1px; background: linear-gradient(90deg, var(--hbl-lb-red) var(--p, 0%), rgba(255, 255, 255, .18) var(--p, 0%)); }
.hbl-lb-range::-moz-range-track { height: 1px; background: rgba(255, 255, 255, .18); }
.hbl-lb-range::-moz-range-progress { height: 1px; background: var(--hbl-lb-red); }
.hbl-lb-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 11px;
  height: 11px;
  margin-top: -5px;
  border: 1px solid var(--hbl-lb-red);
  background: #05070b;
  transform: rotate(45deg);
  box-shadow: 0 0 10px rgba(255, 77, 77, .7);
}
.hbl-lb-range::-moz-range-thumb {
  width: 9px;
  height: 9px;
  border: 1px solid var(--hbl-lb-red);
  border-radius: 0;
  background: #05070b;
  transform: rotate(45deg);
  box-shadow: 0 0 10px rgba(255, 77, 77, .7);
}
.hbl-lb-range:focus-visible { outline: 1px solid var(--hbl-lb-red); outline-offset: 2px; }

.hbl-lb-step { position: relative; min-width: 0; padding: 22px 20px 24px; border-top: 1px solid var(--hbl-lb-line-soft); }
.hbl-lb-step::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 36px;
  height: 1px;
  background: var(--hbl-lb-red);
  box-shadow: 0 0 10px var(--hbl-lb-red);
}
.hbl-lb-step-n { font-family: var(--font-mono); font-size: 40px; line-height: 1; color: rgba(217, 222, 232, .14); letter-spacing: -.02em; }

.hbl-lb-stat-v { font-family: var(--font-grotesk); font-weight: 500; font-size: clamp(34px, 5vw, 52px); letter-spacing: -.03em; line-height: 1; color: #eef1f6; }
.hbl-lb-tick { height: 6px; background: repeating-linear-gradient(90deg, rgba(255, 255, 255, .18) 0 1px, transparent 1px 6px); }

.hbl-lb-field {
  width: 100%;
  border: 1px solid var(--hbl-lb-line);
  background: rgba(255, 255, 255, .02);
  color: var(--hbl-lb-ink);
  font-family: var(--font-sans);
  font-size: 15px;
  padding: 12px 14px;
  border-radius: 0;
  transition: border-color .2s, background-color .2s;
}
.hbl-lb-field::placeholder { color: #5b6372; }
.hbl-lb-field:hover { border-color: rgba(255, 255, 255, .22); }
.hbl-lb-field:focus { border-color: var(--hbl-lb-red); background: rgba(255, 77, 77, .03); outline: none; }
.hbl-lb-field:focus-visible { outline: none; }
.hbl-lb-confirm { animation: hbl-lb-in .5s cubic-bezier(.22, .8, .24, 1) both; }
@keyframes hbl-lb-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

.hbl-lb-glow-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 77, 77, .7), transparent); }

@media (prefers-reduced-motion: reduce) {
  .hbl-lb *, .hbl-lb *::before, .hbl-lb *::after { animation: none !important; transition: none !important; }
  .hbl-lb-scan::after { display: none; }
  .hbl-lb-boot { display: none; }
}
`;
