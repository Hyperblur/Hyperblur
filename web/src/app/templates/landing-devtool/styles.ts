export const css = `
.hbl-dv {
  --hbl-dv-bg: #0b0b0c;
  --hbl-dv-ink: #f4f4f0;
  --hbl-dv-mute: #a3a39b;
  --hbl-dv-dim: #6f6f69;
  --hbl-dv-acid: #a3e635;
  --hbl-dv-line: rgba(255, 255, 255, .1);
  position: relative;
  overflow-x: clip;
  background: var(--hbl-dv-bg);
  color: var(--hbl-dv-ink);
}
.hbl-dv ::selection { background: var(--hbl-dv-acid); color: #0b0b0c; }
.hbl-dv a:focus-visible, .hbl-dv button:focus-visible, .hbl-dv [tabindex]:focus-visible {
  outline: 2px solid var(--hbl-dv-acid);
  outline-offset: 3px;
}
.hbl-dv-rule { border-top: 1px solid var(--hbl-dv-line); }
.hbl-dv-lines {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, .055) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, .055) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: center top;
}
.hbl-dv-dots {
  background-image: radial-gradient(rgba(244, 244, 240, .13) 1px, transparent 1.4px);
  background-size: 16px 16px;
}
.hbl-dv-fade-mask {
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%);
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%);
}
.hbl-dv-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--hbl-dv-acid);
}
.hbl-dv-label::before {
  content: "";
  width: 6px;
  height: 6px;
  background: var(--hbl-dv-acid);
  box-shadow: 0 0 12px var(--hbl-dv-acid);
}
.hbl-dv-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -.01em;
  white-space: nowrap;
  transition: background-color .18s ease, color .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;
}
.hbl-dv-btn-acid {
  background: var(--hbl-dv-acid);
  color: #0b0b0c;
  box-shadow: 0 0 0 1px rgba(163, 230, 53, .4), 0 8px 30px -10px rgba(163, 230, 53, .7), inset 0 1px 0 rgba(255, 255, 255, .45);
}
.hbl-dv-btn-acid:hover { background: #b9f04f; box-shadow: 0 0 0 1px rgba(163, 230, 53, .6), 0 10px 40px -8px rgba(163, 230, 53, .85), inset 0 1px 0 rgba(255, 255, 255, .5); }
.hbl-dv-btn-ghost {
  border: 1px solid var(--hbl-dv-line);
  background: rgba(255, 255, 255, .02);
  color: var(--hbl-dv-ink);
}
.hbl-dv-btn-ghost:hover { border-color: rgba(255, 255, 255, .28); background: rgba(255, 255, 255, .06); }
.hbl-dv-btn-sm { height: 34px; padding: 0 14px; font-size: 12.5px; }
.hbl-dv-navlink {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--hbl-dv-mute);
  border-radius: 6px;
  padding: 6px 4px;
  transition: color .15s ease;
}
.hbl-dv-navlink:hover { color: var(--hbl-dv-ink); }
.hbl-dv-kbd {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border: 1px solid var(--hbl-dv-line);
  border-bottom-width: 2px;
  border-radius: 6px;
  background: #141415;
  color: var(--hbl-dv-ink);
  font-family: var(--font-mono);
  font-size: 11.5px;
}
.hbl-dv-corner { position: absolute; z-index: 1; width: 10px; height: 10px; border-color: rgba(163, 230, 53, .75); pointer-events: none; }
.hbl-dv-corner[data-c="tl"] { top: -7px; left: -7px; border-top: 1px solid; border-left: 1px solid; }
.hbl-dv-corner[data-c="tr"] { top: -7px; right: -7px; border-top: 1px solid; border-right: 1px solid; }
.hbl-dv-corner[data-c="bl"] { bottom: -7px; left: -7px; border-bottom: 1px solid; border-left: 1px solid; }
.hbl-dv-corner[data-c="br"] { bottom: -7px; right: -7px; border-bottom: 1px solid; border-right: 1px solid; }
.hbl-dv-h1 {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: clamp(34px, 8.2vw, 84px);
  line-height: 1;
  letter-spacing: -.055em;
}
.hbl-dv-h2 {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: clamp(28px, 4.6vw, 48px);
  line-height: 1.06;
  letter-spacing: -.045em;
}
.hbl-dv-term {
  position: relative;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 16px;
  background: linear-gradient(180deg, #121213 0%, #0c0c0d 100%);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .6), 0 40px 120px -30px rgba(163, 230, 53, .22), 0 30px 80px -20px rgba(0, 0, 0, .9), inset 0 1px 0 rgba(255, 255, 255, .07);
  overflow: hidden;
}
.hbl-dv-term-body {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.75;
  white-space: pre;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #2a2a2a transparent;
}
@media (min-width: 640px) { .hbl-dv-term-body { font-size: 13.5px; } }
.hbl-dv-tl[data-on="false"] { visibility: hidden; }
.hbl-dv-tl[data-on="true"] { animation: hbl-dv-in .22s ease both; }
.hbl-dv-caret {
  display: inline-block;
  width: .6em;
  height: 1.15em;
  margin-left: 1px;
  vertical-align: -.2em;
  background: var(--hbl-dv-acid);
  animation: hbl-dv-blink 1.05s steps(1) infinite;
}
.hbl-dv-spin {
  display: inline-block;
  width: .62em;
  height: .62em;
  border: 1.5px solid rgba(163, 230, 53, .25);
  border-top-color: var(--hbl-dv-acid);
  border-radius: 50%;
  vertical-align: -.08em;
  animation: hbl-dv-rot .7s linear infinite;
}
.hbl-dv-prog {
  display: inline-block;
  position: relative;
  width: 10ch;
  height: .55em;
  vertical-align: .05em;
  border-radius: 2px;
  background: rgba(163, 230, 53, .14);
  overflow: hidden;
}
.hbl-dv-prog > i {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, var(--hbl-dv-acid) 0 6px, rgba(163, 230, 53, .65) 6px 8px);
  transform-origin: left;
  transform: scaleX(1);
}
.hbl-dv-prog[data-run="true"] > i { animation: hbl-dv-fill var(--hbl-dv-d, 1s) cubic-bezier(.4, .1, .3, 1) both; }
.hbl-dv-tsplit {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 1024px) { .hbl-dv-tsplit { grid-template-columns: minmax(0, 1fr) 260px; } }
.hbl-dv-bento { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 768px) { .hbl-dv-bento { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
.hbl-dv-bento > * { min-width: 0; }
@media (min-width: 768px) {
  .hbl-dv-bento > [data-span="4"] { grid-column: span 4; }
  .hbl-dv-bento > [data-span="3"] { grid-column: span 3; }
  .hbl-dv-bento > [data-span="2"] { grid-column: span 2; }
}
.hbl-dv-card { background: linear-gradient(180deg, #121213, #0d0d0e) !important; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .1) !important; }
.hbl-dv-pulse { animation: hbl-dv-pulse 2.4s ease-in-out infinite; }
.hbl-dv-scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(163, 230, 53, .12), transparent);
  width: 40%;
  animation: hbl-dv-scan 3.2s ease-in-out infinite;
}
.hbl-dv-cp .hb-cp[data-inline="true"] .hb-cp-list { max-height: 364px; }
.hbl-dv-cp .hb-cp-panel { background: #0f0f10; border-color: rgba(255, 255, 255, .12); }
.hbl-dv-cp .hb-cp-field { border-color: rgba(255, 255, 255, .1); height: 48px; }
.hbl-dv-cp .hb-cp-input { font-family: var(--font-mono); font-size: 13.5px; }
.hbl-dv-cp .hb-cp-item { font-family: var(--font-mono); font-size: 12.5px; padding: 8px 10px; }
.hbl-dv-cp .hb-cp-item[aria-selected="true"] { background: rgba(163, 230, 53, .1); box-shadow: inset 2px 0 0 var(--hbl-dv-acid); }
.hbl-dv-cp .hb-cp-group-label { font-family: var(--font-mono); letter-spacing: .12em; }
.hbl-dv-seg {
  height: 100%;
  transform-origin: left;
  transform: scaleX(0);
  transition: transform .9s cubic-bezier(.3, .7, .2, 1) var(--hbl-dv-delay, 0s);
}
.hbl-dv-bars[data-in="true"] .hbl-dv-seg { transform: scaleX(1); }
.hbl-dv-bars .hbl-dv-time { opacity: 0; transition: opacity .4s ease var(--hbl-dv-delay, 0s); }
.hbl-dv-bars[data-in="true"] .hbl-dv-time { opacity: 1; }
.hbl-dv-svt { font-family: var(--font-mono); font-weight: 600; letter-spacing: -.05em; line-height: 1.1; }
.hbl-dv-stroke { color: transparent; -webkit-text-stroke: 1px rgba(244, 244, 240, .35); }
.hbl-dv-beam .hb-abm-node[data-kind="hub"] svg { width: 54%; height: 54%; }
.hbl-dv-plan[data-pop="true"] {
  background: linear-gradient(180deg, rgba(163, 230, 53, .09), rgba(163, 230, 53, .015) 40%, #0e0e0f);
  border-color: rgba(163, 230, 53, .45);
  box-shadow: 0 30px 80px -40px rgba(163, 230, 53, .5), inset 0 1px 0 rgba(163, 230, 53, .25);
}
.hbl-dv-faq .hb-ac-item, .hbl-dv-faq .hb-ac-item:first-child { border-color: var(--hbl-dv-line); }
.hbl-dv-faq .hb-ac-trigger { padding: 20px 4px; font-family: var(--font-mono); font-size: 15px; letter-spacing: -.02em; }
.hbl-dv-faq .hb-ac-trigger:hover { color: var(--hbl-dv-acid); }
.hbl-dv-faq .hb-ac-trigger:focus-visible { outline-color: var(--hbl-dv-acid); }
.hbl-dv-faq .hb-ac-body { color: var(--hbl-dv-mute); font-size: 15px; line-height: 1.65; padding-bottom: 22px; max-width: 68ch; }
.hbl-dv-foot .hb-ftc-in { background: #0b0b0c; border-top-color: var(--hbl-dv-line); padding-left: 0; padding-right: 0; }
.hbl-dv-foot .hb-ftc-logo { font-family: var(--font-mono); }
@keyframes hbl-dv-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
@keyframes hbl-dv-blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
@keyframes hbl-dv-rot { to { transform: rotate(360deg); } }
@keyframes hbl-dv-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hbl-dv-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(163, 230, 53, .55); } 50% { opacity: .75; box-shadow: 0 0 0 5px rgba(163, 230, 53, 0); } }
@keyframes hbl-dv-scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(260%); } }
@media (prefers-reduced-motion: reduce) {
  .hbl-dv-tl[data-on="true"], .hbl-dv-caret, .hbl-dv-spin, .hbl-dv-pulse, .hbl-dv-scan { animation: none; }
  .hbl-dv-prog[data-run="true"] > i { animation: none; }
  .hbl-dv-seg, .hbl-dv-bars .hbl-dv-time { transition: none; }
  .hbl-dv-btn { transition: none; }
}
`;
