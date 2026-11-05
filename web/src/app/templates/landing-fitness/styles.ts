export const css = `
.hbl-ft-root {
  --hbl-ft-bg: #0b0c0a;
  --hbl-ft-gr: #161813;
  --hbl-ft-lime: #c8ff3d;
  --hbl-ft-bone: #f1f0e8;
  --hbl-ft-ember: #ff5a1f;
  --hbl-ft-muted: #8b8f82;
  --hbl-ft-line: rgba(241, 240, 232, 0.1);
  position: relative;
  overflow-x: clip;
  background: var(--hbl-ft-bg);
  color: var(--hbl-ft-bone);
  color-scheme: dark;
}
.hbl-ft-root ::selection { background: var(--hbl-ft-lime); color: var(--hbl-ft-bg); }
.hbl-ft-root a:focus-visible,
.hbl-ft-root button:focus-visible,
.hbl-ft-root select:focus-visible,
.hbl-ft-root input:focus-visible,
.hbl-ft-root [tabindex]:focus-visible {
  outline: 2px solid var(--hbl-ft-lime);
  outline-offset: 3px;
}
.hbl-ft-root .hbl-ft-cta :focus-visible,
.hbl-ft-root .hbl-ft-plan[data-hot] :focus-visible,
.hbl-ft-root .hbl-ft-band-lime :focus-visible { outline-color: var(--hbl-ft-bg); }
.hbl-ft-wrap { width: 100%; max-width: 1240px; margin: 0 auto; padding-left: 16px; padding-right: 16px; }
@media (min-width: 640px) { .hbl-ft-wrap { padding-left: 24px; padding-right: 24px; } }
.hbl-ft-lime { color: var(--hbl-ft-lime); }
.hbl-ft-ember { color: var(--hbl-ft-ember); }
.hbl-ft-muted { color: var(--hbl-ft-muted); }
.hbl-ft-rule { border-color: var(--hbl-ft-line); }

.hbl-ft-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--hbl-ft-muted);
}
.hbl-ft-kicker::before {
  content: "";
  width: 18px;
  height: 3px;
  border-radius: 2px;
  background: var(--hbl-ft-lime);
}
.hbl-ft-mono-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hbl-ft-muted);
}
.hbl-ft-h1 {
  font-family: var(--font-grotesk);
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(44px, 11.5vw, 96px);
  line-height: 0.86;
  letter-spacing: -0.055em;
}
@media (min-width: 1024px) { .hbl-ft-h1 { font-size: clamp(64px, 6.8vw, 98px); } }
.hbl-ft-h2 {
  font-family: var(--font-grotesk);
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(38px, 5.6vw, 76px);
  line-height: 0.9;
  letter-spacing: -0.045em;
}

.hbl-ft-link { position: relative; color: var(--hbl-ft-muted); transition: color .2s ease; }
.hbl-ft-link:hover, .hbl-ft-link:focus-visible { color: var(--hbl-ft-bone); }

.hbl-ft-btn, .hbl-ft-btn-ghost, .hbl-ft-btn-dark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 22px;
  border: 0;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color .25s ease, color .25s ease, box-shadow .25s ease, transform .25s ease;
}
.hbl-ft-btn {
  background: var(--hbl-ft-lime);
  color: var(--hbl-ft-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 12px 34px -14px rgba(200, 255, 61, 0.75);
}
.hbl-ft-btn:hover { background: var(--hbl-ft-bone); }
.hbl-ft-btn:active, .hbl-ft-btn-ghost:active, .hbl-ft-btn-dark:active { transform: scale(0.98); }
.hbl-ft-btn svg, .hbl-ft-btn-dark svg, .hbl-ft-btn-ghost svg { transition: transform .3s cubic-bezier(.22, .8, .24, 1); }
.hbl-ft-btn:hover svg, .hbl-ft-btn-dark:hover svg, .hbl-ft-btn-ghost:hover svg { transform: translateX(3px); }
.hbl-ft-btn-ghost {
  background: transparent;
  color: var(--hbl-ft-bone);
  box-shadow: inset 0 0 0 1px rgba(241, 240, 232, 0.2);
}
.hbl-ft-btn-ghost:hover { background: rgba(241, 240, 232, 0.08); box-shadow: inset 0 0 0 1px rgba(241, 240, 232, 0.35); }
.hbl-ft-btn-dark { background: var(--hbl-ft-bg); color: var(--hbl-ft-bone); box-shadow: 0 14px 30px -16px rgba(0, 0, 0, 0.8); }
.hbl-ft-btn-dark:hover { background: var(--hbl-ft-gr); color: var(--hbl-ft-lime); }
.hbl-ft-btn-sm { height: 40px; padding: 0 16px; font-size: 14px; }
.hbl-ft-btn-lg { height: 62px; padding: 0 30px; font-size: 18px; }

.hbl-ft-nav { position: relative; z-index: 5; border-bottom: 1px solid var(--hbl-ft-line); background: var(--hbl-ft-bg); }

.hbl-ft-tag {
  flex: none;
  padding: 3px 9px;
  border: 1px solid rgba(200, 255, 61, 0.4);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--hbl-ft-lime);
  white-space: nowrap;
}

.hbl-ft-chip {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  max-width: 100%;
  padding: 8px 16px 8px 12px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 20px;
  background: rgba(22, 24, 19, 0.75);
  font-size: 13px;
  line-height: 1.35;
}
.hbl-ft-chip-dot {
  position: relative;
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--hbl-ft-ember);
}
.hbl-ft-chip-dot::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  border: 2px solid var(--hbl-ft-ember);
  opacity: 0;
  animation: hbl-ft-ping 1.8s cubic-bezier(.2, .7, .3, 1) infinite;
}
.hbl-ft-chip-text { min-width: 0; animation: hbl-ft-swap .5s cubic-bezier(.22, .8, .24, 1); }
.hbl-ft-chip-text b { font-weight: 600; }
@keyframes hbl-ft-ping {
  0% { transform: scale(0.6); opacity: 0.9; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes hbl-ft-swap {
  from { opacity: 0; transform: translateY(6px); filter: blur(4px); }
  to { opacity: 1; transform: none; filter: none; }
}

.hbl-ft-hero { position: relative; isolation: isolate; overflow: hidden; }
.hbl-ft-hero::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto auto;
  width: 70%;
  height: 90%;
  z-index: -1;
  background: radial-gradient(closest-side, rgba(200, 255, 61, 0.12), transparent 70%);
}
.hbl-ft-hero-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(var(--hbl-ft-line) 1px, transparent 1px), linear-gradient(90deg, var(--hbl-ft-line) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 60% 30%, #000 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 80% 70% at 60% 30%, #000 20%, transparent 75%);
  opacity: 0.55;
}

.hbl-ft-art { position: relative; width: 100%; max-width: 560px; aspect-ratio: 1; margin: 0 auto; }
.hbl-ft-art-svg { display: block; width: 100%; height: 100%; overflow: visible; }
.hbl-ft-spin { transform-box: view-box; transform-origin: 50% 50%; }
.hbl-ft-spin-slow { animation: hbl-ft-rot 60s linear infinite; }
.hbl-ft-spin-rev { animation: hbl-ft-rot 36s linear infinite reverse; }
.hbl-ft-arc { animation: hbl-ft-fill 4s cubic-bezier(.45, 0, .2, 1) infinite alternate; }
.hbl-ft-arc-2 { animation-duration: 5.5s; animation-delay: -2s; }
.hbl-ft-lift { transform-box: view-box; transform-origin: 50% 50%; animation: hbl-ft-lift 3.2s cubic-bezier(.45, 0, .2, 1) infinite; }
@keyframes hbl-ft-rot { to { transform: rotate(360deg); } }
@keyframes hbl-ft-fill {
  from { stroke-dasharray: 38 100; }
  to { stroke-dasharray: 86 100; }
}
@keyframes hbl-ft-lift {
  0%, 100% { transform: translateY(10px); }
  45%, 55% { transform: translateY(-14px); }
}
.hbl-ft-eq {
  position: absolute;
  top: 4%;
  left: 0;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  width: 26%;
  height: 12%;
}
.hbl-ft-eq span {
  flex: 1;
  border-radius: 2px;
  background: var(--hbl-ft-lime);
  opacity: 0.75;
  transform-origin: bottom;
  animation: hbl-ft-eq 1.1s ease-in-out infinite alternate;
}
.hbl-ft-eq span:nth-child(3n) { background: var(--hbl-ft-bone); opacity: 0.35; }
@keyframes hbl-ft-eq {
  from { transform: scaleY(0.25); }
  to { transform: scaleY(1); }
}
.hbl-ft-art-tag {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 14px;
  background: rgba(11, 12, 10, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(241, 240, 232, 0.06);
}
.hbl-ft-art-tag-a { top: 10%; right: 0; }
.hbl-ft-art-tag-b { top: 36%; left: 0; }
@media (max-width: 479px) {
  .hbl-ft-art-tag { padding: 7px 10px; }
  .hbl-ft-art-tag .text-lg { font-size: 14px; }
  .hbl-ft-art-tag-b { top: 30%; }
}

.hbl-ft-book {
  position: relative;
  padding: 22px;
  border: 1px solid rgba(241, 240, 232, 0.12);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(28, 31, 24, 0.94), rgba(18, 20, 16, 0.96));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: inset 0 1px 0 rgba(241, 240, 232, 0.08), 0 40px 80px -30px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(200, 255, 61, 0.05);
  scroll-margin-top: 24px;
}
.hbl-ft-book fieldset { margin: 0; padding: 0; border: 0; min-width: 0; }
.hbl-ft-daychip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 0;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 12px;
  background: rgba(11, 12, 10, 0.6);
  color: var(--hbl-ft-bone);
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
}
.hbl-ft-daychip:hover { border-color: rgba(241, 240, 232, 0.3); }
.hbl-ft-daychip[aria-pressed="true"] { background: var(--hbl-ft-lime); border-color: var(--hbl-ft-lime); color: var(--hbl-ft-bg); }
.hbl-ft-slot {
  padding: 7px 11px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-ft-bone);
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease;
}
.hbl-ft-slot:hover { border-color: rgba(241, 240, 232, 0.3); }
.hbl-ft-slot[aria-pressed="true"] { border-color: var(--hbl-ft-lime); background: rgba(200, 255, 61, 0.12); color: var(--hbl-ft-lime); }
.hbl-ft-field {
  display: block;
  width: 100%;
  min-width: 0;
  height: 42px;
  padding: 0 12px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 10px;
  background: rgba(11, 12, 10, 0.8);
  color: var(--hbl-ft-bone);
  font: inherit;
  font-size: 14px;
  transition: border-color .2s ease;
}
.hbl-ft-field::placeholder { color: #6c7064; }
.hbl-ft-field:hover { border-color: rgba(241, 240, 232, 0.25); }
.hbl-ft-root .hbl-ft-field:focus-visible { outline-offset: 1px; border-color: var(--hbl-ft-lime); }
.hbl-ft-book-ok { padding: 12px 2px; animation: hbl-ft-swap .5s cubic-bezier(.22, .8, .24, 1); }
.hbl-ft-book-check {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 18px;
  border-radius: 999px;
  background: var(--hbl-ft-lime);
  color: var(--hbl-ft-bg);
  box-shadow: 0 0 0 8px rgba(200, 255, 61, 0.12);
}

.hbl-ft-bands { position: relative; border-top: 1px solid var(--hbl-ft-line); border-bottom: 1px solid var(--hbl-ft-line); }
.hbl-ft-band { padding: 14px 0; }
.hbl-ft-band-lime { background: var(--hbl-ft-lime); color: var(--hbl-ft-bg); }
.hbl-ft-band-dark { background: var(--hbl-ft-bg); }
.hbl-ft-band-text {
  font-family: var(--font-grotesk);
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(30px, 5.4vw, 68px);
  line-height: 1;
  letter-spacing: -0.04em;
}
.hbl-ft-band-text .hb-svt-item { padding-right: 0.4em; }
.hbl-ft-band-outline { color: transparent; -webkit-text-stroke: 1.2px rgba(241, 240, 232, 0.55); }

.hbl-ft-press {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--hbl-ft-muted);
  white-space: nowrap;
}
.hbl-ft-press::before { content: ""; width: 6px; height: 6px; border-radius: 999px; background: var(--hbl-ft-lime); }

.hbl-ft-schedule {
  border-top: 1px solid var(--hbl-ft-line);
  background: radial-gradient(60% 50% at 100% 0%, rgba(200, 255, 61, 0.06), transparent 70%);
}
.hbl-ft-table {
  overflow: hidden;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 24px;
  background: var(--hbl-ft-gr);
  box-shadow: inset 0 1px 0 rgba(241, 240, 232, 0.05);
}
.hbl-ft-days {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
  padding: 10px;
  border-bottom: 1px solid var(--hbl-ft-line);
  background: rgba(11, 12, 10, 0.5);
}
.hbl-ft-day {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
  padding: 12px 0 10px;
  border: 0;
  border-radius: 14px;
  background: transparent;
  color: var(--hbl-ft-muted);
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease;
}
.hbl-ft-day:hover { color: var(--hbl-ft-bone); background: rgba(241, 240, 232, 0.04); }
.hbl-ft-day[aria-selected="true"] { background: var(--hbl-ft-bone); color: var(--hbl-ft-bg); }
.hbl-ft-today {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 999px;
  background: var(--hbl-ft-lime);
  color: var(--hbl-ft-bg);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.3;
  vertical-align: middle;
}
.hbl-ft-day .hbl-ft-today { position: absolute; top: -2px; left: 50%; transform: translateX(-50%); }
@media (max-width: 479px) {
  .hbl-ft-day .hbl-ft-today { width: 6px; height: 6px; padding: 0; top: 5px; font-size: 0; }
}
.hbl-ft-panel { padding: 6px 10px 10px; }
.hbl-ft-rows { margin: 0; padding: 0; list-style: none; }
.hbl-ft-row {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr) auto;
  column-gap: 14px;
  row-gap: 8px;
  align-items: center;
  padding: 16px 10px;
  border-bottom: 1px solid var(--hbl-ft-line);
  border-radius: 12px;
  transition: background-color .2s ease;
  animation: hbl-ft-rowin .5s cubic-bezier(.22, .8, .24, 1) backwards;
}
.hbl-ft-row:last-child { border-bottom: 0; }
.hbl-ft-row:hover { background: rgba(241, 240, 232, 0.03); }
.hbl-ft-row > :nth-child(1) { grid-row: 1 / span 2; align-self: start; }
.hbl-ft-row > :nth-child(3) { grid-column: 2; grid-row: 2; }
.hbl-ft-row > :nth-child(4) { grid-column: 3; grid-row: 1 / span 2; }
@media (min-width: 768px) {
  .hbl-ft-row { grid-template-columns: 110px minmax(0, 1.4fr) minmax(0, 1fr) 128px; padding: 18px 16px; column-gap: 24px; }
  .hbl-ft-row > :nth-child(n) { grid-column: auto; grid-row: auto; align-self: center; }
}
@keyframes hbl-ft-rowin {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
.hbl-ft-kind { flex: none; width: 8px; height: 8px; border-radius: 2px; background: var(--hbl-ft-lime); }
.hbl-ft-row[data-kind="hiit"] .hbl-ft-kind { background: var(--hbl-ft-ember); }
.hbl-ft-row[data-kind="mobility"] .hbl-ft-kind { background: var(--hbl-ft-bone); }
.hbl-ft-row[data-kind="boxing"] .hbl-ft-kind { background: transparent; box-shadow: inset 0 0 0 2px var(--hbl-ft-lime); }
.hbl-ft-row[data-kind="kids"] .hbl-ft-kind { background: var(--hbl-ft-muted); }
.hbl-ft-capbar { height: 4px; overflow: hidden; border-radius: 999px; background: rgba(241, 240, 232, 0.1); }
.hbl-ft-capbar span { display: block; height: 100%; border-radius: inherit; background: var(--hbl-ft-bone); transition: width .5s cubic-bezier(.22, .8, .24, 1); }
.hbl-ft-capbar span[data-hot] { background: var(--hbl-ft-ember); }
.hbl-ft-bookbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 92px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
}
.hbl-ft-bookbtn:active { transform: scale(0.96); }
.hbl-ft-bookbtn[data-state="open"] { background: var(--hbl-ft-lime); color: var(--hbl-ft-bg); }
.hbl-ft-bookbtn[data-state="open"]:hover { background: var(--hbl-ft-bone); }
.hbl-ft-bookbtn[data-state="booked"] { background: rgba(200, 255, 61, 0.1); border-color: var(--hbl-ft-lime); color: var(--hbl-ft-lime); }
.hbl-ft-bookbtn[data-state="full"] { background: transparent; border-color: rgba(241, 240, 232, 0.22); color: var(--hbl-ft-bone); }
.hbl-ft-bookbtn[data-state="full"]:hover { border-color: rgba(241, 240, 232, 0.45); }
@media (min-width: 768px) { .hbl-ft-bookbtn { width: 100%; } }
.hbl-ft-tablefoot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
  padding: 16px 10px 6px;
  border-top: 1px solid var(--hbl-ft-line);
}

.hbl-ft-root .hbl-ft-prog {
  background: linear-gradient(180deg, #171a14, #0f110d);
  color: var(--hbl-ft-bone);
  box-shadow: inset 0 0 0 1px var(--hbl-ft-line);
}
.hbl-ft-prog-icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 16px;
  background: rgba(200, 255, 61, 0.06);
  color: var(--hbl-ft-lime);
  transition: transform .4s cubic-bezier(.22, .8, .24, 1), background-color .3s ease;
}
.hbl-ft-prog:hover .hbl-ft-prog-icon { transform: translateY(-3px) rotate(-6deg); background: rgba(200, 255, 61, 0.14); }
.hbl-ft-int { width: 14px; height: 6px; border-radius: 2px; background: rgba(241, 240, 232, 0.14); }
.hbl-ft-int[data-on] { background: var(--hbl-ft-lime); }

.hbl-ft-root .hbl-ft-coach {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 22px;
  background: var(--hbl-ft-gr);
}
.hbl-ft-coach-art { position: relative; aspect-ratio: 300 / 300; overflow: hidden; border-bottom: 1px solid var(--hbl-ft-line); }
.hbl-ft-coach-art svg { transition: transform .6s cubic-bezier(.22, .8, .24, 1); }
.hbl-ft-coach:hover .hbl-ft-coach-art svg { transform: scale(1.04); }
.hbl-ft-coach-stat {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(11, 12, 10, 0.85);
  border: 1px solid var(--hbl-ft-line);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--hbl-ft-lime);
}

.hbl-ft-results { border-top: 1px solid var(--hbl-ft-line); }
.hbl-ft-statgrid { background: var(--hbl-ft-line); }
.hbl-ft-stat { padding: 28px; background: var(--hbl-ft-bg); }
.hbl-ft-stat dd { margin: 0; }
.hbl-ft-panelcard {
  padding: 28px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 22px;
  background: var(--hbl-ft-gr);
  box-shadow: inset 0 1px 0 rgba(241, 240, 232, 0.05);
}
.hbl-ft-bars { display: flex; align-items: stretch; gap: 10px; height: 230px; }
.hbl-ft-barcol { display: flex; flex: 1; flex-direction: column; align-items: center; gap: 8px; min-width: 0; }
.hbl-ft-bartrack { display: flex; flex: 1; flex-direction: column; justify-content: flex-end; align-items: center; gap: 6px; width: 100%; }
.hbl-ft-barval { font-family: var(--font-mono); font-size: 11px; color: var(--hbl-ft-muted); }
.hbl-ft-bar {
  display: block;
  width: 100%;
  max-width: 56px;
  border-radius: 10px 10px 3px 3px;
  background: linear-gradient(180deg, rgba(241, 240, 232, 0.24), rgba(241, 240, 232, 0.06));
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 1s cubic-bezier(.22, .8, .24, 1);
}
.hbl-ft-bar[data-last] { background: linear-gradient(180deg, var(--hbl-ft-lime), rgba(200, 255, 61, 0.35)); box-shadow: 0 0 30px -6px rgba(200, 255, 61, 0.6); }
.hbl-ft-chart[data-seen] .hbl-ft-bar { transform: scaleY(1); }
.hbl-ft-barlabel { font-family: var(--font-mono); font-size: 11px; color: var(--hbl-ft-muted); }

.hbl-ft-root .hbl-ft-seg { background: rgba(241, 240, 232, 0.07); box-shadow: inset 0 0 0 1px var(--hbl-ft-line); border-radius: 999px; }
.hbl-ft-root .hbl-ft-seg .hb-seg-t { border-radius: 999px; }
.hbl-ft-root .hbl-ft-seg .hb-seg-i { border-radius: 999px; font-family: var(--font-grotesk); color: rgba(241, 240, 232, 0.7); }
.hbl-ft-root .hbl-ft-seg .hb-seg-i[aria-checked="true"] { color: var(--hbl-ft-bg); }
.hbl-ft-root .hbl-ft-seg .hb-seg-i:focus-visible { outline: 2px solid var(--hbl-ft-bone); }

.hbl-ft-plan {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 28px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 24px;
  background: var(--hbl-ft-gr);
  transition: transform .4s cubic-bezier(.22, .8, .24, 1), border-color .3s ease;
}
.hbl-ft-plan:hover { transform: translateY(-4px); border-color: rgba(241, 240, 232, 0.2); }
.hbl-ft-plan > a { margin-top: auto; }
.hbl-ft-plan > ul { margin-bottom: 40px; }
.hbl-ft-plan-muted { color: var(--hbl-ft-muted); }
.hbl-ft-plan[data-hot] {
  background: radial-gradient(120% 80% at 100% 0%, #e2ff8f, var(--hbl-ft-lime) 55%);
  border-color: var(--hbl-ft-lime);
  color: var(--hbl-ft-bg);
  box-shadow: 0 40px 90px -40px rgba(200, 255, 61, 0.6);
}
.hbl-ft-plan[data-hot] .hbl-ft-plan-muted { color: rgba(11, 12, 10, 0.72); }
.hbl-ft-plan-badge {
  position: absolute;
  top: 18px;
  right: 18px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--hbl-ft-bg);
  color: var(--hbl-ft-lime);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hbl-ft-plan-check {
  display: grid;
  flex: none;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  border-radius: 999px;
  background: rgba(200, 255, 61, 0.14);
  color: var(--hbl-ft-lime);
}
.hbl-ft-plan[data-hot] .hbl-ft-plan-check { background: var(--hbl-ft-bg); color: var(--hbl-ft-lime); }
.hbl-ft-price { display: inline-block; animation: hbl-ft-pop .45s cubic-bezier(.3, 1.4, .5, 1); }
@keyframes hbl-ft-pop {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to { opacity: 1; transform: none; }
}

.hbl-ft-reviews { border-top: 1px solid var(--hbl-ft-line); }
.hbl-ft-rbar { position: relative; flex: 1; height: 6px; overflow: hidden; border-radius: 999px; background: rgba(241, 240, 232, 0.08); }
.hbl-ft-rbar span { position: absolute; inset: 0 auto 0 0; border-radius: inherit; background: var(--hbl-ft-lime); }
.hbl-ft-root .hbl-ft-review {
  padding: 20px;
  border-color: var(--hbl-ft-line);
  border-radius: 18px;
  background: var(--hbl-ft-gr);
  color: var(--hbl-ft-bone);
  transition: border-color .3s ease, transform .4s cubic-bezier(.22, .8, .24, 1);
}
.hbl-ft-root .hbl-ft-review:hover { border-color: rgba(200, 255, 61, 0.35); transform: translateY(-3px); }
.hbl-ft-root .hbl-ft-review .hb-rv-star-f svg { fill: var(--hbl-ft-lime); }

.hbl-ft-map {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 22px;
  background: #10120e;
}
.hbl-ft-map-card {
  padding: 16px;
  border-top: 1px solid var(--hbl-ft-line);
  background: rgba(11, 12, 10, 0.9);
}
@media (min-width: 640px) {
  .hbl-ft-map-card {
    position: absolute;
    left: 16px;
    bottom: 16px;
    border: 1px solid var(--hbl-ft-line);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
.hbl-ft-route { animation: hbl-ft-dash 1.4s linear infinite; }
@keyframes hbl-ft-dash { to { stroke-dashoffset: -26; } }
.hbl-ft-ping { transform-box: fill-box; transform-origin: center; animation: hbl-ft-pulse 2.2s ease-out infinite; }
@keyframes hbl-ft-pulse {
  0% { transform: scale(0.5); opacity: 0.5; }
  100% { transform: scale(1.6); opacity: 0; }
}
.hbl-ft-fac { padding: 20px; background: var(--hbl-ft-bg); }
.hbl-ft-open {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(200, 255, 61, 0.35);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--hbl-ft-lime);
  white-space: nowrap;
}
.hbl-ft-open .hbl-ft-chip-dot { background: var(--hbl-ft-lime); }
.hbl-ft-open .hbl-ft-chip-dot::after { border-color: var(--hbl-ft-lime); }
.hbl-ft-root table { border-collapse: separate; border-spacing: 0; }
.hbl-ft-root thead th { padding-left: 12px; padding-right: 12px; }
.hbl-ft-hour > * { padding-left: 12px; padding-right: 12px; border-top: 1px solid var(--hbl-ft-line); }
.hbl-ft-hour[data-today] > * { background: rgba(200, 255, 61, 0.09); color: var(--hbl-ft-lime); border-top-color: transparent; }
.hbl-ft-hour[data-today] > :first-child { border-radius: 10px 0 0 10px; }
.hbl-ft-hour[data-today] > :last-child { border-radius: 0 10px 10px 0; }
.hbl-ft-hour[data-today] + .hbl-ft-hour > * { border-top-color: transparent; }

.hbl-ft-root .hbl-ft-faq .hb-ac-item { border-color: var(--hbl-ft-line); }
.hbl-ft-root .hbl-ft-faq .hb-ac-trigger { padding: 22px 4px; font-family: var(--font-grotesk); font-size: 18px; font-weight: 600; letter-spacing: -0.01em; transition: color .2s ease; }
.hbl-ft-root .hbl-ft-faq .hb-ac-trigger:hover { color: var(--hbl-ft-lime); }
.hbl-ft-root .hbl-ft-faq .hb-ac-body { padding-bottom: 22px; font-size: 15px; line-height: 1.65; color: var(--hbl-ft-muted); }
.hbl-ft-root .hbl-ft-faq .hb-ac-chevron { color: var(--hbl-ft-lime); opacity: 1; }

.hbl-ft-cta { position: relative; overflow: hidden; background: var(--hbl-ft-lime); color: var(--hbl-ft-bg); }
.hbl-ft-cta::after {
  content: "";
  position: absolute;
  right: -10%;
  bottom: -60%;
  width: 60%;
  aspect-ratio: 1;
  border-radius: 999px;
  border: 60px solid rgba(11, 12, 10, 0.06);
  box-shadow: 0 0 0 60px rgba(11, 12, 10, 0.03);
  pointer-events: none;
}
.hbl-ft-cta-band { padding: 14px 0; border-bottom: 1px solid rgba(11, 12, 10, 0.14); }
.hbl-ft-cta-velo {
  font-family: var(--font-grotesk);
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(48px, 9vw, 128px);
  line-height: 1;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(11, 12, 10, 0.4);
}
.hbl-ft-cta-velo .hb-svt-item { padding-right: 0.3em; }

.hbl-ft-footer { border-top: 1px solid var(--hbl-ft-line); background: var(--hbl-ft-bg); }
.hbl-ft-social {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--hbl-ft-line);
  border-radius: 999px;
  color: var(--hbl-ft-muted);
  transition: color .2s ease, border-color .2s ease, background-color .2s ease;
}
.hbl-ft-social:hover { color: var(--hbl-ft-bg); background: var(--hbl-ft-lime); border-color: var(--hbl-ft-lime); }
.hbl-ft-mobilebar { padding: 12px 16px 16px; border-top: 1px solid var(--hbl-ft-line); background: var(--hbl-ft-gr); }
@media (min-width: 640px) { .hbl-ft-mobilebar { display: none; } }

@media (prefers-reduced-motion: reduce) {
  .hbl-ft-root *, .hbl-ft-root *::before, .hbl-ft-root *::after { scroll-behavior: auto; }
  .hbl-ft-spin, .hbl-ft-arc, .hbl-ft-lift, .hbl-ft-eq span, .hbl-ft-route, .hbl-ft-ping,
  .hbl-ft-chip-dot::after, .hbl-ft-chip-text, .hbl-ft-row, .hbl-ft-price, .hbl-ft-book-ok { animation: none !important; }
  .hbl-ft-bar { transform: none; transition: none; }
  .hbl-ft-btn, .hbl-ft-btn-ghost, .hbl-ft-btn-dark, .hbl-ft-plan, .hbl-ft-root .hbl-ft-review, .hbl-ft-prog-icon,
  .hbl-ft-coach-art svg, .hbl-ft-capbar span, .hbl-ft-bookbtn, .hbl-ft-daychip, .hbl-ft-slot { transition: none; }
  .hbl-ft-btn:hover svg, .hbl-ft-btn-dark:hover svg, .hbl-ft-btn-ghost:hover svg,
  .hbl-ft-plan:hover, .hbl-ft-root .hbl-ft-review:hover, .hbl-ft-prog:hover .hbl-ft-prog-icon,
  .hbl-ft-coach:hover .hbl-ft-coach-art svg { transform: none; }
}
`;
