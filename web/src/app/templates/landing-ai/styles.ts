export const css = `
.hbl-ai {
  --hbl-ai-bg: #07080d;
  --hbl-ai-line: rgba(255, 255, 255, .08);
  --hbl-ai-ink: #eceef6;
  --hbl-ai-muted: #9aa0b4;
  --hbl-ai-violet: #8b5cf6;
  --hbl-ai-cyan: #22d3ee;
  position: relative;
  overflow-x: clip;
  background: var(--hbl-ai-bg);
  color: var(--hbl-ai-ink);
  font-family: var(--font-sans);
}
.hbl-ai ::selection { background: rgba(139, 92, 246, .45); color: #ffffff; }
.hbl-ai-focus:focus-visible,
.hbl-ai-btn:focus-visible,
.hbl-ai-navlink:focus-visible,
.hbl-ai-flink:focus-visible,
.hbl-ai-mini:focus-visible,
.hbl-ai-undo:focus-visible,
.hbl-ai-tab:focus-visible,
.hbl-ai-toggle button:focus-visible {
  outline: 2px solid var(--hbl-ai-cyan);
  outline-offset: 3px;
}
.hbl-ai-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 22px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color .2s ease, border-color .2s ease, box-shadow .25s ease, transform .2s ease, color .2s ease;
}
.hbl-ai-btn-sm { height: 36px; padding: 0 16px; font-size: 14px; }
.hbl-ai-btn-primary {
  color: #0a0b12;
  background: #f4f4fb;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .12), 0 0 0 1px rgba(255, 255, 255, .2), 0 8px 30px -10px rgba(139, 92, 246, .7);
}
.hbl-ai-btn-primary:hover {
  background: #ffffff;
  transform: translateY(-1px);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .12), 0 0 0 1px rgba(255, 255, 255, .3), 0 14px 40px -10px rgba(139, 92, 246, .85), 0 0 60px -20px rgba(34, 211, 238, .8);
}
.hbl-ai-btn-ghost {
  color: var(--hbl-ai-ink);
  background: rgba(255, 255, 255, .03);
  border: 1px solid rgba(255, 255, 255, .12);
  backdrop-filter: blur(8px);
}
.hbl-ai-btn-ghost:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .22); }
.hbl-ai-navlink {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  color: #a3a8bd;
  font-size: 14px;
  transition: color .2s ease, background-color .2s ease;
}
.hbl-ai-navlink:hover { color: #ffffff; background: rgba(255, 255, 255, .05); }
.hbl-ai-flink { color: #7d8299; font-size: 13.5px; border-radius: 4px; transition: color .2s ease; }
.hbl-ai-flink:hover { color: var(--hbl-ai-ink); }
.hbl-ai-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #b9a4ff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .16em;
  text-transform: uppercase;
}
.hbl-ai-eyebrow::before {
  content: "";
  width: 18px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--hbl-ai-violet));
}
.text-center .hbl-ai-eyebrow::after {
  content: "";
  width: 18px;
  height: 1px;
  background: linear-gradient(90deg, var(--hbl-ai-violet), transparent);
}
.hbl-ai-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 14px 5px 5px;
  border: 1px solid rgba(139, 92, 246, .3);
  border-radius: 999px;
  font-size: 13px;
  background: linear-gradient(180deg, rgba(139, 92, 246, .14), rgba(139, 92, 246, .04));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 0 30px -10px rgba(139, 92, 246, .7);
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hbl-ai-badge:hover { border-color: rgba(139, 92, 246, .6); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 0 40px -8px rgba(139, 92, 246, .8); }
.hbl-ai-badge-chip {
  padding: 2px 9px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 600;
  background: linear-gradient(135deg, var(--hbl-ai-violet), #6d28d9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25);
}
.hbl-ai-h1-second { color: transparent; }
.hbl-ai-h1-second .hb-bt-i {
  color: transparent;
  background: linear-gradient(100deg, #c4b5fd 0%, #a5b4fc 45%, #67e8f9 100%);
  background-size: 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
}
.hb-bt.hbl-ai-h1-second[data-active="true"] .hb-bt-i { animation-delay: calc(var(--hb-n) * var(--hb-st) + .32s); }
.hbl-ai-h1-second .hb-bt-i:nth-child(1) { background-position: 0% 0; }
.hbl-ai-h1-second .hb-bt-i:nth-child(2) { background-position: 50% 0; }
.hbl-ai-h1-second .hb-bt-i:nth-child(3) { background-position: 100% 0; }
.hbl-ai-grid {
  background-image: linear-gradient(rgba(255, 255, 255, .045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .045) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: center top;
  -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, #000 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, #000 20%, transparent 75%);
}
.hbl-ai-hero-fade { background: linear-gradient(180deg, transparent, var(--hbl-ai-bg)); }
@keyframes hbl-ai-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -12px, 0); }
}
.hbl-ai-float { position: relative; animation: hbl-ai-float 8s ease-in-out infinite; }
.hbl-ai-under {
  position: absolute;
  inset: 8% 6% -6%;
  border-radius: 40px;
  background: radial-gradient(60% 60% at 30% 40%, rgba(139, 92, 246, .55), transparent 70%), radial-gradient(55% 60% at 75% 60%, rgba(34, 211, 238, .4), transparent 70%);
  filter: blur(60px);
  opacity: .75;
}
.hbl-ai-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 20px;
  text-align: left;
  background: linear-gradient(180deg, rgba(22, 24, 38, .78), rgba(10, 11, 18, .9));
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  backdrop-filter: blur(20px) saturate(140%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .09), 0 0 0 1px rgba(139, 92, 246, .08), 0 50px 120px -40px rgba(0, 0, 0, .9);
}
.hbl-ai-frame::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(196, 181, 253, .7), rgba(103, 232, 249, .7), transparent);
}
.hbl-ai-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, .06);
  background: rgba(255, 255, 255, .02);
}
.hbl-ai-dot { display: block; width: 10px; height: 10px; border-radius: 50%; background: rgba(255, 255, 255, .12); }
.hbl-ai-url {
  display: inline-flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  max-width: 340px;
  margin: 0 auto;
  padding: 5px 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .06);
  border-radius: 8px;
  color: #7d8299;
  font-size: 12px;
  white-space: nowrap;
  background: rgba(0, 0, 0, .25);
}
@keyframes hbl-ai-pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, .6); }
  70% { box-shadow: 0 0 0 7px rgba(34, 211, 238, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
}
.hbl-ai-live { display: inline-flex; align-items: center; gap: 7px; color: #a5f3fc; font-size: 12px; font-weight: 500; }
.hbl-ai-live::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hbl-ai-cyan);
  animation: hbl-ai-pulse 2s ease-out infinite;
}
.hbl-ai-queue {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  color: #8d92a8;
  font-size: 13px;
}
.hbl-ai-queue[data-active="true"] {
  color: #f2f3fa;
  background: linear-gradient(90deg, rgba(139, 92, 246, .2), rgba(139, 92, 246, .04));
  box-shadow: inset 0 0 0 1px rgba(139, 92, 246, .25);
}
.hbl-ai-count { padding: 1px 7px; border-radius: 999px; font-size: 11px; background: rgba(255, 255, 255, .06); }
.hbl-ai-spark { flex: 1; border-radius: 3px; background: linear-gradient(180deg, rgba(34, 211, 238, .85), rgba(139, 92, 246, .3)); }
.hbl-ai-tag {
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  color: #c9cce0;
  font-family: var(--font-mono);
  font-size: 12px;
  background: rgba(255, 255, 255, .03);
}
.hbl-ai-approval {
  padding: 14px;
  border: 1px solid rgba(139, 92, 246, .35);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(139, 92, 246, .12), rgba(139, 92, 246, .03));
  box-shadow: 0 0 40px -16px rgba(139, 92, 246, .8);
  transition: border-color .3s ease, background .3s ease, box-shadow .3s ease;
}
.hbl-ai-approval[data-state="approved"] { border-color: rgba(34, 211, 238, .35); background: linear-gradient(180deg, rgba(34, 211, 238, .1), rgba(34, 211, 238, .02)); box-shadow: 0 0 40px -16px rgba(34, 211, 238, .7); }
.hbl-ai-approval[data-state="rejected"] { border-color: rgba(248, 113, 113, .3); background: rgba(248, 113, 113, .05); box-shadow: none; }
.hbl-ai-approval-icon {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  color: #ddd6fe;
  background: rgba(139, 92, 246, .25);
}
.hbl-ai-mini {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  color: #d4d6e6;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  background: rgba(255, 255, 255, .04);
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, opacity .2s ease;
}
.hbl-ai-mini:hover { background: rgba(255, 255, 255, .09); border-color: rgba(255, 255, 255, .22); }
.hbl-ai-mini-yes { color: #0a0b12; border-color: transparent; background: linear-gradient(135deg, #c4b5fd, #67e8f9); }
.hbl-ai-mini-yes:hover { background: linear-gradient(135deg, #ddd6fe, #a5f3fc); border-color: transparent; }
.hbl-ai-mini:disabled { cursor: not-allowed; opacity: .35; }
span.hbl-ai-mini { cursor: default; }
.hbl-ai-undo { color: #9aa0b4; font-size: 12px; text-decoration: underline; text-underline-offset: 3px; border-radius: 4px; cursor: pointer; }
.hbl-ai-undo:hover { color: #ffffff; }
.hbl-ai .hb-ct { border-color: rgba(255, 255, 255, .06); background: rgba(0, 0, 0, .2); }
.hbl-ai .hb-ct-bubble { border-color: rgba(255, 255, 255, .07); background: rgba(255, 255, 255, .04); color: #d4d6e6; }
.hbl-ai .hb-tcc { border-color: rgba(255, 255, 255, .07); background: rgba(255, 255, 255, .025); }
.hbl-ai .hb-tcc-row { border-top-color: rgba(255, 255, 255, .06); background: rgba(0, 0, 0, .25); }
.hbl-ai .hb-ti-time { border-color: rgba(255, 255, 255, .08); background: rgba(255, 255, 255, .03); }
.hbl-ai .hb-as-mark { background: #0d0e17; border-color: rgba(255, 255, 255, .16); }
.hbl-ai .hb-as-line { background: rgba(255, 255, 255, .08); }
.hbl-ai-logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #7d8299;
  font-size: 19px;
  white-space: nowrap;
  transition: color .25s ease;
}
.hbl-ai-logo:hover { color: #eceef6; }
.hbl-ai .hb-spc.hbl-ai-bento {
  background: linear-gradient(180deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, .008)), #0b0c14;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .07), inset 0 1px 0 rgba(255, 255, 255, .06);
}
.hbl-ai-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: #ede9fe;
  background: linear-gradient(160deg, rgba(139, 92, 246, .35), rgba(34, 211, 238, .12));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .12), 0 8px 24px -10px rgba(139, 92, 246, .8);
}
.hbl-ai-panel {
  border: 1px solid rgba(255, 255, 255, .07);
  border-radius: 14px;
  background: rgba(7, 8, 13, .6);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .03);
}
.hbl-ai-route { flex: 0 0 auto; padding: 2px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 500; }
.hbl-ai-route[data-tone="violet"] { color: #d8ccff; background: rgba(139, 92, 246, .18); }
.hbl-ai-route[data-tone="cyan"] { color: #a5f3fc; background: rgba(34, 211, 238, .13); }
.hbl-ai-route[data-tone="amber"] { color: #fde68a; background: rgba(251, 191, 36, .12); }
.hbl-ai-doc {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  min-width: 56px;
  padding: 8px 8px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 10px;
  color: #c9cce0;
  background: rgba(255, 255, 255, .03);
}
.hbl-ai-link-line { display: block; flex: 1 1 auto; min-width: 8px; height: 1px; background: linear-gradient(90deg, rgba(34, 211, 238, .2), rgba(34, 211, 238, .8)); }
.hbl-ai-meter { background: linear-gradient(90deg, var(--hbl-ai-violet), var(--hbl-ai-cyan)); box-shadow: 0 0 14px rgba(34, 211, 238, .5); }
.hbl-ai-avatar {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  background: linear-gradient(135deg, var(--hbl-ai-violet), #0891b2);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2);
}
.hbl-ai-avatar-sm { width: 22px; height: 22px; font-size: 9px; }
.hbl-ai-check {
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: #ddd6fe;
  background: rgba(139, 92, 246, .22);
  box-shadow: inset 0 0 0 1px rgba(139, 92, 246, .4);
}
.hbl-ai-check[data-tone="cyan"] { color: #a5f3fc; background: rgba(34, 211, 238, .15); box-shadow: inset 0 0 0 1px rgba(34, 211, 238, .35); }
.hbl-ai-wait { display: inline-block; flex: 0 0 auto; width: 18px; height: 18px; border: 1.5px dashed rgba(255, 255, 255, .25); border-radius: 50%; }
.hbl-ai-card {
  border: 1px solid var(--hbl-ai-line);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .035), rgba(255, 255, 255, .01)), #0a0b12;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 30px 60px -40px rgba(0, 0, 0, .9);
}
.hbl-ai-glow-band {
  background: radial-gradient(40% 50% at 30% 50%, rgba(139, 92, 246, .14), transparent 70%), radial-gradient(35% 45% at 72% 55%, rgba(34, 211, 238, .09), transparent 70%);
  filter: blur(20px);
}
.hbl-ai-tabs {
  display: flex;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 5px;
  overflow-x: auto;
  gap: 4px;
  border: 1px solid var(--hbl-ai-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, .025);
  scrollbar-width: none;
}
.hbl-ai-tab {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  color: #9aa0b4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color .2s ease, background-color .25s ease, box-shadow .25s ease;
}
.hbl-ai-tab:hover { color: #eceef6; }
.hbl-ai-tab[aria-selected="true"] {
  color: #ffffff;
  background: linear-gradient(180deg, rgba(139, 92, 246, .35), rgba(139, 92, 246, .15));
  box-shadow: inset 0 0 0 1px rgba(196, 181, 253, .35), 0 6px 20px -8px rgba(139, 92, 246, .8);
}
@keyframes hbl-ai-in {
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hbl-ai-tabpanel { animation: hbl-ai-in .45s cubic-bezier(.22, .8, .24, 1) both; }
.hbl-ai-state { flex: 0 0 auto; padding: 3px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 500; }
.hbl-ai-state[data-state="run"] { color: #ddd6fe; background: rgba(139, 92, 246, .18); }
.hbl-ai-state[data-state="wait"] { color: #fde68a; background: rgba(251, 191, 36, .13); }
.hbl-ai-state[data-state="done"] { color: #a5f3fc; background: rgba(34, 211, 238, .13); }
.hbl-ai-gate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--hbl-ai-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, .02);
  transition: border-color .3s ease, box-shadow .3s ease, background .3s ease;
}
.hbl-ai-gate[data-on="true"] {
  border-color: rgba(251, 191, 36, .35);
  background: rgba(251, 191, 36, .05);
  box-shadow: 0 0 36px -14px rgba(251, 191, 36, .55);
}
.hbl-ai-code { margin: 0; white-space: pre; background: rgba(0, 0, 0, .2); }
.hbl-ai-ln { display: inline-block; width: 2.4em; color: #474b5e; user-select: none; }
.hbl-ai-beam-card { background: radial-gradient(80% 70% at 50% 50%, rgba(34, 211, 238, .06), transparent 70%), linear-gradient(180deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, .01)), #0a0b12; }
.hbl-ai-beam-glow {
  background-image: radial-gradient(rgba(255, 255, 255, .07) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 80%);
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 80%);
}
.hbl-ai .hb-abm-node[data-kind="hub"] { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .14), 0 0 50px -10px rgba(139, 92, 246, .8); }
.hbl-ai .hb-abm-node[data-kind="hub"] svg { width: 62%; height: 62%; }
.hbl-ai-stats {
  border: 1px solid var(--hbl-ai-line);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, .005));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hbl-ai-stat { border-color: var(--hbl-ai-line); }
.hbl-ai-stat:nth-child(odd) { border-right: 1px solid var(--hbl-ai-line); }
.hbl-ai-stat:nth-child(-n + 2) { border-bottom: 1px solid var(--hbl-ai-line); }
@media (min-width: 1024px) {
  .hbl-ai-stat:nth-child(-n + 3) { border-right: 1px solid var(--hbl-ai-line); }
  .hbl-ai-stat:nth-child(4) { border-right: 0; }
  .hbl-ai-stat:nth-child(-n + 2) { border-bottom: 0; }
}
.hbl-ai-grad-text {
  color: transparent;
  background: linear-gradient(100deg, #ffffff 0%, #ddd6fe 40%, #67e8f9 100%);
  -webkit-background-clip: text;
  background-clip: text;
}
.hbl-ai-quote { transition: border-color .3s ease; }
.hbl-ai-quote:hover { border-color: rgba(139, 92, 246, .3); }
.hbl-ai-toggle {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--hbl-ai-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, .025);
}
.hbl-ai-toggle button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  color: #9aa0b4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color .2s ease, background-color .2s ease;
}
.hbl-ai-toggle button:hover { color: #eceef6; }
.hbl-ai-toggle button[aria-pressed="true"] { color: #0a0b12; background: #f4f4fb; }
.hbl-ai-save { padding: 1px 7px; border-radius: 999px; color: #5b21b6; font-size: 11px; background: #ede9fe; }
.hbl-ai-toggle button[aria-pressed="false"] .hbl-ai-save { color: #c4b5fd; background: rgba(139, 92, 246, .18); }
.hbl-ai-plan {
  border: 1px solid var(--hbl-ai-line);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, .008)), #0a0b12;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  transition: border-color .3s ease, transform .3s ease;
}
.hbl-ai-plan:hover { border-color: rgba(255, 255, 255, .16); }
.hbl-ai-plan[data-featured="true"] {
  border: 1px solid transparent;
  background: radial-gradient(90% 60% at 50% 0%, rgba(139, 92, 246, .18), transparent 70%) padding-box, linear-gradient(180deg, #11121d, #0a0b12) padding-box, linear-gradient(150deg, rgba(196, 181, 253, .9), rgba(139, 92, 246, .5) 35%, rgba(34, 211, 238, .55) 70%, rgba(255, 255, 255, .08)) border-box;
  box-shadow: 0 30px 80px -30px rgba(139, 92, 246, .55);
}
.hbl-ai-pop { padding: 3px 10px; border-radius: 999px; color: #ede9fe; font-size: 11.5px; font-weight: 500; background: rgba(139, 92, 246, .25); box-shadow: inset 0 0 0 1px rgba(196, 181, 253, .3); }
.hbl-ai .hb-ac.hbl-ai-faq .hb-ac-item { border-color: var(--hbl-ai-line); }
.hbl-ai-faq .hb-ac-trigger { padding-top: 20px; padding-bottom: 20px; color: #eceef6; font-size: 16.5px; font-weight: 500; }
.hbl-ai-faq .hb-ac-trigger:hover { color: #ffffff; }
.hbl-ai-faq .hb-ac-trigger:focus-visible { outline: 2px solid var(--hbl-ai-cyan); outline-offset: 2px; }
.hbl-ai .hbl-ai-faq .hb-ac-body { color: #9aa0b4; font-size: 15px; line-height: 1.7; }
.hbl-ai-cta {
  border: 1px solid rgba(139, 92, 246, .25);
  border-radius: 32px;
  background: radial-gradient(70% 90% at 50% 0%, rgba(139, 92, 246, .3), transparent 70%), radial-gradient(50% 60% at 85% 100%, rgba(34, 211, 238, .16), transparent 70%), #0a0a14;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 40px 120px -50px rgba(139, 92, 246, .7);
}
.hbl-ai-cta-glow {
  background-image: linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(ellipse 60% 70% at 50% 40%, #000, transparent 75%);
  mask-image: radial-gradient(ellipse 60% 70% at 50% 40%, #000, transparent 75%);
}
.hbl-ai-ok { width: 7px; height: 7px; border-radius: 50%; background: #34d399; box-shadow: 0 0 10px rgba(52, 211, 153, .7); }
@media (prefers-reduced-motion: reduce) {
  .hbl-ai-float, .hbl-ai-live::before, .hbl-ai-tabpanel { animation: none; }
  .hbl-ai-btn, .hbl-ai-btn-primary:hover { transition: none; transform: none; }
  .hbl-ai-approval, .hbl-ai-gate, .hbl-ai-plan, .hbl-ai-quote { transition: none; }
}
`;
